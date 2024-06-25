import { ModuleRef } from '@nestjs/core';
import path from 'path';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  lstatSync,
  copyFileSync,
  symlinkSync,
  readlinkSync,
  mkdir,
  rmdir,
  readFileSync,
  writeFileSync,
} from 'fs';
import { BadRequestException } from '@nestjs/common';
import { isEmail, isNumberString } from 'class-validator';
import { Between, Like } from 'typeorm';
import { dateForSearch, t } from './time.utils';
import { createHash, randomBytes } from 'crypto';
import { hostname } from 'os';
import * as QRCode from 'qrcode';
import * as Jimp from 'jimp';
import * as QRCodeReader from 'qrcode-reader';

import { promisify } from 'util';

export const randomDigits = (length = 5) => {
  return Math.random()
    .toString()
    .substring(2, length + 2);
};

export const random = (length = 8) => {
  return randomBytes(Math.ceil(length)).toString('hex').substring(0, length);
};

export const environment = process.env.NODE_ENV;
export const isProduction = environment === 'production';
export const isTesting = environment === 'testing';
export const isLocal = environment === 'local';

/**
 * set up a handle for module ref
 * to be used to inject services without the contructor
 */
export let moduleRef: ModuleRef;
export const setModuleRef = (aModuleRef: ModuleRef) => {
  if (!moduleRef) {
    moduleRef = aModuleRef;
  }
};

export const outject = (service: any): any => {
  return moduleRef.get(service);
};

export const formatPhoneNumber = (value: string): string => {
  if (!value) {
    return value;
  }
  return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};

export const unifyPhoneNumber = (value: string): string => {
  if (![11, 13, 14].includes(value?.length)) {
    throw new BadRequestException(
      `Invalid phone number. Phone number must start with +234, 234 or 0`,
    );
  }

  if (
    !value.startsWith('+234') &&
    !value.startsWith('234') &&
    !value.startsWith('0')
  ) {
    throw new BadRequestException(
      `Invalid phone number. Phone number must start with +234, 234 or 0`,
    );
  }

  return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};

export const isPhoneNumber = (value: string): boolean => {
  return (
    isNumberString(value) &&
    [11, 13, 14].includes(value?.length) &&
    (value.startsWith('+234') ||
      value.startsWith('234') ||
      value.startsWith('0'))
  );
};

export const isEmailAddress = (value: string): boolean => {
  return isEmail(value);
};

export function isNumeric(str: string) {
  return !isNullOrUndefined(str) && /^\d+$/.test(str);
}

export function isNullOrUndefined(value: any) {
  return value === undefined || value === null;
}

export function isUndefined(value: any) {
  return value === undefined;
}

export function isBlankString(value: any) {
  return value === '';
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isObject(x: any) {
  return x != null && typeof x === 'object';
}

export function isArray(x: any) {
  return x != null && typeof x === 'object' && Array.isArray(x);
}

export function toJSON(mayBeJSON: string, returnJSON = false) {
  try {
    const obj = JSON.parse(mayBeJSON);
    if (obj && typeof obj === 'object') {
      return returnJSON ? obj : true;
    }
  } catch (e) {}
  return false;
}

export function ucfirst(phrase: string) {
  var firstLetter = phrase.substring(0, 1);
  return firstLetter.toUpperCase() + phrase.substring(1);
}

export const titleCase = (phrase: string) => {
  if (!phrase) {
    return phrase;
  }

  let upper = true;
  let newPhrase = '';
  for (let i = 0, l = phrase?.length; i < l; i++) {
    // Note that you can also check for all kinds of spaces  with
    // phrase[i].match(/\s/)
    if (phrase[i] == ' ') {
      upper = true;
      newPhrase += phrase[i];
      continue;
    }
    newPhrase += upper ? phrase[i].toUpperCase() : phrase[i].toLowerCase();
    upper = false;
  }
  return newPhrase;
};

export const prettify = (phrase: string) => {
  return phrase.replace(/_/g, ' ');
};

export type HttpResponse = [boolean, number, string, string, any];

export const trimString = (characters: string, replaceWith: string = '') => {
  return characters.replace(/^\//, replaceWith).replace(/\/$/, replaceWith);
};

export function copy(src: string, dest: string) {
  if (!existsSync(dest)) mkdirSync(dest);

  readdirSync(src).forEach((dirent) => {
    const [srcPath, destPath] = [src, dest].map((dirPath) =>
      path.join(dirPath, dirent),
    );
    const stat = lstatSync(srcPath);

    switch (true) {
      case stat.isFile():
        copyFileSync(srcPath, destPath);
        break;
      case stat.isDirectory():
        copy(srcPath, destPath);
        break;
      case stat.isSymbolicLink():
        symlinkSync(readlinkSync(srcPath), destPath);
        break;
    }
  });
}

export const maskPhoneNumber = (
  val: string,
  use = '*',
  prefixLen = 5,
  suffixLen = 3,
) => {
  if (!val) {
    return null;
  }

  if (val.length >= 14) {
    prefixLen += 3;
  }

  if (val.length == 13) {
    prefixLen += 2;
  }

  const prefix = val.substring(0, prefixLen);
  const suffix = val.substring(val.length - suffixLen);
  const masked = val
    .substring(prefixLen, val.length - suffixLen)
    .replace(/./g, use);

  return `${prefix}${masked}${suffix}`;
};
export const mkDir = (path: string, callback: (e: any) => void) => {
  mkdir(path, { recursive: false }, callback);
};

export const rmDir = (path: string, callback: (e: any) => void) => {
  rmdir(path, { recursive: false }, callback);
};

export const mask = (val: string, use = '*') => {
  if (!val) {
    return null;
  }
  return '*******';
};

export const makeFilter = (
  query: string,
  from: string,
  to: string,
  columns: string[],
) => {
  let dateRange = {};
  let filter = [];
  if (!!from && !!to) {
    dateRange = { createdAt: Between(dateForSearch(from), dateForSearch(to)) };
  }
  try {
    const parsedQuery = JSON.parse(query);
    if (Array.isArray(parsedQuery)) {
      filter = [...filter, ...parsedQuery];
    } else {
      throw new Error('JSON parsed, but its not an array');
    }
  } catch (error) {
    filter = [
      ...filter,
      ...(!!query
        ? columns.map((column) => ({
            [column]: Like(`%${query}%`),
            ...dateRange,
          }))
        : [dateRange]),
    ];
  }

  return isArrayEmpty(filter) ? null : filter;
};

export const isArrayEmpty = (val: any[])  => {
  return val.every(v => Object.keys(v).length < 1)
};

const host = createHash('md5').update(hostname()).digest('hex').substring(0, 6); // 6 xters
const processId = ('' + process.pid).padStart(3, '0'); // 3 xters
export const reference = (service = 'ZAP', maxLength = 26) => {
  const time = new Date().getTime(); // 13 xters
  const wildcard = randomBytes(256 / 8)
    .toString('hex')
    .substring(0, 6); // 7 xters
  return `${service}-${host}-${processId}-${wildcard}-${time}`
    .substring(0, maxLength - 1)
    .toUpperCase();
};

export const trimUser = (user: any) => {
  if (!user) {
    return user;
  }
  return Object.keys(user)
    .filter((k) =>
      [
        'id',
        'username',
        'gender',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'phoneVerifiedAt',
        'emailVerifiedAt',
        'deviceType',
        'deviceId',
        'language',
        'suspendedAt',
        'closedAt',
        'createdAt',
        'referralCode',
      ].includes(k),
    )
    .reduce((prev, curr) => {
      return { ...prev, [curr]: user[curr] };
    }, {});
};

export const prettyTimeLeft = (ms: number) => {
  if (!ms || ms < 0 || ms <= 1000 * 60) {
    return `a minute`;
  }

  const s = Math.round(ms / 1000);
  const m = Math.round(s / 60);
  if (m <= 60) {
    return `${m} minute(s)`;
  }

  const h = Math.round(m / 60);
  if (h <= 24) {
    return `${m} hour(s)`;
  }

  const d = Math.round(h / 24);
  return `${d} day(s)`;
};

const alphabeths = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const alphaNums = 'abcdefghijklmnopqrstuvwxyz0123456789';
export const randomType = (
  len: number,
  type: 'alpha' | 'num' | 'alphaNum' = 'alpha',
) => {
  let collection = alphabeths;
  switch (type) {
    case 'alpha':
      collection = alphabeths;
      break;
    case 'num':
      collection = numbers;
      break;
    case 'alphaNum':
      collection = alphaNums;
      break;
  }
  let result = '';
  for (let i = len; i > 0; --i)
    result += collection[Math.floor(Math.random() * collection.length)];
  return result;
};

export const randomUsername = () => {
  return `${randomType(1, 'alpha')}-${randomType(3, 'num')}-${randomType(
    3,
    'num',
  )}-${randomType(3, 'num')}`.toUpperCase();
};

export const randomReferralCode = () => {
  return `${randomType(1, 'num')}-${randomType(3, 'alpha')}-${randomType(
    3,
    'alpha',
  )}`.toUpperCase();
};

export const shuffle = (arr: any[]) => {
  let currentIndex = arr.length;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

export const qrImageToCode = async (base64Image: string) => {
  return new Promise((resolve, reject) => {
    Jimp.read(Buffer.from(base64Image, 'base64'), function (err, image) {
      if (err) {
        reject(err);
      }
      let qrcode = new QRCodeReader();
      qrcode.callback = function (err, value) {
        if (err) {
          reject(err);
        }
        resolve(value.result);
      };

      image?.bitmap && qrcode.decode(image?.bitmap);
    });
  });
};

export const qrCodeToImage = (code: string) => {
  return QRCode.toDataURL(code);
};

// export const getNextOnboardingStage = (user: User, otpService: OtpService) => {
//   switch (user.stage) {
//     case OnboardingStage.INITIATE:
//       return OnboardingStage.VERIFY;
//     case OnboardingStage.VERIFY:
//       return OnboardingStage.PROFILE;
//     case OnboardingStage.PROFILE:
//       return OnboardingStage.CONFIRM_PROFILE;
//     case OnboardingStage.CONFIRM_PROFILE:
//       return OnboardingStage.LOGIN;
//     default:
//       return OnboardingStage.INITIATE;
//   }
// };

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const concat = (...parts: string[]) => {
  return parts.join('');
};

export const sortObject = (
  obj: any,
  compareFn?: (a: any, b: any) => number,
) => {
  return Object.keys(obj)
    .sort(compareFn)
    .reduce((o, k) => {
      o[k] = obj[k];
      return o;
    }, {});
};

export const fileToBase64 = (path: string) => {
  return Buffer.from(readFileSync(path)).toString('base64');
};

export const base64ToFile = (base64: string, file: string) => {
  writeFileSync(file, Buffer.from(base64, 'base64'));
};

export const getOrderNumber = () => {
  return `${t().format('YYYYMM')}${randomDigits(12)}${randomDigits(12)}`;
};

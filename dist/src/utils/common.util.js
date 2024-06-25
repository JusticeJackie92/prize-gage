"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderNumber = exports.base64ToFile = exports.fileToBase64 = exports.sortObject = exports.concat = exports.sleep = exports.qrCodeToImage = exports.qrImageToCode = exports.shuffle = exports.randomReferralCode = exports.randomUsername = exports.randomType = exports.prettyTimeLeft = exports.trimUser = exports.reference = exports.isArrayEmpty = exports.makeFilter = exports.mask = exports.rmDir = exports.mkDir = exports.maskPhoneNumber = exports.copy = exports.trimString = exports.prettify = exports.titleCase = exports.ucfirst = exports.toJSON = exports.isArray = exports.isObject = exports.isFunction = exports.isBlankString = exports.isUndefined = exports.isNullOrUndefined = exports.isNumeric = exports.isEmailAddress = exports.isPhoneNumber = exports.unifyPhoneNumber = exports.formatPhoneNumber = exports.outject = exports.setModuleRef = exports.moduleRef = exports.isLocal = exports.isTesting = exports.isProduction = exports.environment = exports.random = exports.randomDigits = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const time_utils_1 = require("./time.utils");
const crypto_1 = require("crypto");
const os_1 = require("os");
const QRCode = require("qrcode");
const Jimp = require("jimp");
const QRCodeReader = require("qrcode-reader");
const randomDigits = (length = 5) => {
    return Math.random()
        .toString()
        .substring(2, length + 2);
};
exports.randomDigits = randomDigits;
const random = (length = 8) => {
    return (0, crypto_1.randomBytes)(Math.ceil(length)).toString('hex').substring(0, length);
};
exports.random = random;
exports.environment = process.env.NODE_ENV;
exports.isProduction = exports.environment === 'production';
exports.isTesting = exports.environment === 'testing';
exports.isLocal = exports.environment === 'local';
const setModuleRef = (aModuleRef) => {
    if (!exports.moduleRef) {
        exports.moduleRef = aModuleRef;
    }
};
exports.setModuleRef = setModuleRef;
const outject = (service) => {
    return exports.moduleRef.get(service);
};
exports.outject = outject;
const formatPhoneNumber = (value) => {
    if (!value) {
        return value;
    }
    return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};
exports.formatPhoneNumber = formatPhoneNumber;
const unifyPhoneNumber = (value) => {
    if (![11, 13, 14].includes(value === null || value === void 0 ? void 0 : value.length)) {
        throw new common_1.BadRequestException(`Invalid phone number. Phone number must start with +234, 234 or 0`);
    }
    if (!value.startsWith('+234') &&
        !value.startsWith('234') &&
        !value.startsWith('0')) {
        throw new common_1.BadRequestException(`Invalid phone number. Phone number must start with +234, 234 or 0`);
    }
    return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};
exports.unifyPhoneNumber = unifyPhoneNumber;
const isPhoneNumber = (value) => {
    return ((0, class_validator_1.isNumberString)(value) &&
        [11, 13, 14].includes(value === null || value === void 0 ? void 0 : value.length) &&
        (value.startsWith('+234') ||
            value.startsWith('234') ||
            value.startsWith('0')));
};
exports.isPhoneNumber = isPhoneNumber;
const isEmailAddress = (value) => {
    return (0, class_validator_1.isEmail)(value);
};
exports.isEmailAddress = isEmailAddress;
function isNumeric(str) {
    return !isNullOrUndefined(str) && /^\d+$/.test(str);
}
exports.isNumeric = isNumeric;
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
function isBlankString(value) {
    return value === '';
}
exports.isBlankString = isBlankString;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
function isArray(x) {
    return x != null && typeof x === 'object' && Array.isArray(x);
}
exports.isArray = isArray;
function toJSON(mayBeJSON, returnJSON = false) {
    try {
        const obj = JSON.parse(mayBeJSON);
        if (obj && typeof obj === 'object') {
            return returnJSON ? obj : true;
        }
    }
    catch (e) { }
    return false;
}
exports.toJSON = toJSON;
function ucfirst(phrase) {
    var firstLetter = phrase.substring(0, 1);
    return firstLetter.toUpperCase() + phrase.substring(1);
}
exports.ucfirst = ucfirst;
const titleCase = (phrase) => {
    if (!phrase) {
        return phrase;
    }
    let upper = true;
    let newPhrase = '';
    for (let i = 0, l = phrase === null || phrase === void 0 ? void 0 : phrase.length; i < l; i++) {
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
exports.titleCase = titleCase;
const prettify = (phrase) => {
    return phrase.replace(/_/g, ' ');
};
exports.prettify = prettify;
const trimString = (characters, replaceWith = '') => {
    return characters.replace(/^\//, replaceWith).replace(/\/$/, replaceWith);
};
exports.trimString = trimString;
function copy(src, dest) {
    if (!(0, fs_1.existsSync)(dest))
        (0, fs_1.mkdirSync)(dest);
    (0, fs_1.readdirSync)(src).forEach((dirent) => {
        const [srcPath, destPath] = [src, dest].map((dirPath) => path_1.default.join(dirPath, dirent));
        const stat = (0, fs_1.lstatSync)(srcPath);
        switch (true) {
            case stat.isFile():
                (0, fs_1.copyFileSync)(srcPath, destPath);
                break;
            case stat.isDirectory():
                copy(srcPath, destPath);
                break;
            case stat.isSymbolicLink():
                (0, fs_1.symlinkSync)((0, fs_1.readlinkSync)(srcPath), destPath);
                break;
        }
    });
}
exports.copy = copy;
const maskPhoneNumber = (val, use = '*', prefixLen = 5, suffixLen = 3) => {
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
exports.maskPhoneNumber = maskPhoneNumber;
const mkDir = (path, callback) => {
    (0, fs_1.mkdir)(path, { recursive: false }, callback);
};
exports.mkDir = mkDir;
const rmDir = (path, callback) => {
    (0, fs_1.rmdir)(path, { recursive: false }, callback);
};
exports.rmDir = rmDir;
const mask = (val, use = '*') => {
    if (!val) {
        return null;
    }
    return '*******';
};
exports.mask = mask;
const makeFilter = (query, from, to, columns) => {
    let dateRange = {};
    let filter = [];
    if (!!from && !!to) {
        dateRange = { createdAt: (0, typeorm_1.Between)((0, time_utils_1.dateForSearch)(from), (0, time_utils_1.dateForSearch)(to)) };
    }
    try {
        const parsedQuery = JSON.parse(query);
        if (Array.isArray(parsedQuery)) {
            filter = [...filter, ...parsedQuery];
        }
        else {
            throw new Error('JSON parsed, but its not an array');
        }
    }
    catch (error) {
        filter = [
            ...filter,
            ...(!!query
                ? columns.map((column) => (Object.assign({ [column]: (0, typeorm_1.Like)(`%${query}%`) }, dateRange)))
                : [dateRange]),
        ];
    }
    return (0, exports.isArrayEmpty)(filter) ? null : filter;
};
exports.makeFilter = makeFilter;
const isArrayEmpty = (val) => {
    return val.every(v => Object.keys(v).length < 1);
};
exports.isArrayEmpty = isArrayEmpty;
const host = (0, crypto_1.createHash)('md5').update((0, os_1.hostname)()).digest('hex').substring(0, 6);
const processId = ('' + process.pid).padStart(3, '0');
const reference = (service = 'ZAP', maxLength = 26) => {
    const time = new Date().getTime();
    const wildcard = (0, crypto_1.randomBytes)(256 / 8)
        .toString('hex')
        .substring(0, 6);
    return `${service}-${host}-${processId}-${wildcard}-${time}`
        .substring(0, maxLength - 1)
        .toUpperCase();
};
exports.reference = reference;
const trimUser = (user) => {
    if (!user) {
        return user;
    }
    return Object.keys(user)
        .filter((k) => [
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
    ].includes(k))
        .reduce((prev, curr) => {
        return Object.assign(Object.assign({}, prev), { [curr]: user[curr] });
    }, {});
};
exports.trimUser = trimUser;
const prettyTimeLeft = (ms) => {
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
exports.prettyTimeLeft = prettyTimeLeft;
const alphabeths = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const alphaNums = 'abcdefghijklmnopqrstuvwxyz0123456789';
const randomType = (len, type = 'alpha') => {
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
exports.randomType = randomType;
const randomUsername = () => {
    return `${(0, exports.randomType)(1, 'alpha')}-${(0, exports.randomType)(3, 'num')}-${(0, exports.randomType)(3, 'num')}-${(0, exports.randomType)(3, 'num')}`.toUpperCase();
};
exports.randomUsername = randomUsername;
const randomReferralCode = () => {
    return `${(0, exports.randomType)(1, 'num')}-${(0, exports.randomType)(3, 'alpha')}-${(0, exports.randomType)(3, 'alpha')}`.toUpperCase();
};
exports.randomReferralCode = randomReferralCode;
const shuffle = (arr) => {
    let currentIndex = arr.length;
    let randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex],
            arr[currentIndex],
        ];
    }
    return arr;
};
exports.shuffle = shuffle;
const qrImageToCode = async (base64Image) => {
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
            (image === null || image === void 0 ? void 0 : image.bitmap) && qrcode.decode(image === null || image === void 0 ? void 0 : image.bitmap);
        });
    });
};
exports.qrImageToCode = qrImageToCode;
const qrCodeToImage = (code) => {
    return QRCode.toDataURL(code);
};
exports.qrCodeToImage = qrCodeToImage;
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
exports.sleep = sleep;
const concat = (...parts) => {
    return parts.join('');
};
exports.concat = concat;
const sortObject = (obj, compareFn) => {
    return Object.keys(obj)
        .sort(compareFn)
        .reduce((o, k) => {
        o[k] = obj[k];
        return o;
    }, {});
};
exports.sortObject = sortObject;
const fileToBase64 = (path) => {
    return Buffer.from((0, fs_1.readFileSync)(path)).toString('base64');
};
exports.fileToBase64 = fileToBase64;
const base64ToFile = (base64, file) => {
    (0, fs_1.writeFileSync)(file, Buffer.from(base64, 'base64'));
};
exports.base64ToFile = base64ToFile;
const getOrderNumber = () => {
    return `${(0, time_utils_1.t)().format('YYYYMM')}${(0, exports.randomDigits)(12)}${(0, exports.randomDigits)(12)}`;
};
exports.getOrderNumber = getOrderNumber;
//# sourceMappingURL=common.util.js.map
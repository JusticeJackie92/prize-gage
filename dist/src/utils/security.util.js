"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromBase64 = exports.toBase64 = exports.compareHmac = exports.generateHmac = exports.decrypt = exports.encrypt = exports.compare = exports.hash = void 0;
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const crypto_2 = require("crypto");
const common_util_1 = require("./common.util");
const ENCRYPTION_ALGO = 'aes-256-cbc';
const IV_LENGTH = 16;
const hash = (text) => {
    return bcrypt.hashSync(text, bcrypt.genSaltSync());
};
exports.hash = hash;
const compare = (text, hashedText) => {
    return bcrypt.compareSync(text, hashedText);
};
exports.compare = compare;
const encrypt = (text) => {
    if ((0, common_util_1.isNullOrUndefined)(text)) {
        return text;
    }
    const iv = (0, crypto_1.randomBytes)(IV_LENGTH);
    const cipher = (0, crypto_1.createCipheriv)(ENCRYPTION_ALGO, Buffer.from(process.env.ENCRYPTION_KEY), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};
exports.encrypt = encrypt;
const decrypt = (text) => {
    if ((0, common_util_1.isNullOrUndefined)(text)) {
        return text;
    }
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = (0, crypto_2.createDecipheriv)('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), iv);
    const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
const generateHmac = (payload, algo = 'sha512') => {
    return (0, crypto_1.createHmac)(algo, process.env.BUD_API_PUBLIC_KEY)
        .update(JSON.stringify(payload))
        .digest('hex');
};
exports.generateHmac = generateHmac;
const compareHmac = (mac, payload, algo = 'sha512') => {
    return mac === (0, exports.generateHmac)(payload, algo);
};
exports.compareHmac = compareHmac;
const toBase64 = (str) => {
    return Buffer.from(str, 'utf8').toString('base64');
};
exports.toBase64 = toBase64;
const fromBase64 = (base64) => {
    return Buffer.from(base64, 'base64').toString('utf8');
};
exports.fromBase64 = fromBase64;
//# sourceMappingURL=security.util.js.map
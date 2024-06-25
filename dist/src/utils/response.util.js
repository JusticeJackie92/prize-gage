"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = exports.response = void 0;
const common_1 = require("@nestjs/common");
const response = (status, title, message, code, data, meta) => {
    return {
        status,
        title,
        message,
        data,
        meta,
    };
};
exports.response = response;
const success = (data, title, message, meta) => {
    return (0, exports.response)('success', title, message, common_1.HttpStatus.OK, data, meta);
};
exports.success = success;
const error = (title, message, code = common_1.HttpStatus.BAD_REQUEST) => {
    const res = (0, exports.response)('error', title, message, code, null);
    throw new common_1.HttpException(res, code);
};
exports.error = error;
//# sourceMappingURL=response.util.js.map
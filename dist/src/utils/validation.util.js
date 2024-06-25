"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsName = void 0;
const class_validator_1 = require("class-validator");
const IsName = (validationOptions) => {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isName',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return !/\d/.test(value);
                },
                defaultMessage(args) {
                    return `${args.property} must not contain a numeric character`;
                },
            },
        });
    };
};
exports.IsName = IsName;
//# sourceMappingURL=validation.util.js.map
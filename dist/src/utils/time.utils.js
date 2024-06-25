"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strToDate = exports.isDateEqual = exports.dateForSearch = exports.compareTime = exports.isDateValid = exports.date = exports.now = exports.t = void 0;
const moment = require("moment");
const t = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
    return date ? moment(date, format) : moment(new Date(), format);
};
exports.t = t;
const now = () => {
    return moment().format('YYYY-MM-DD hh:mm:ss');
};
exports.now = now;
const date = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
    return moment(date).format(format);
};
exports.date = date;
const isDateValid = (date) => {
    return moment(date).isValid();
};
exports.isDateValid = isDateValid;
const compareTime = (first, second) => {
    return moment(first).diff(second);
};
exports.compareTime = compareTime;
const dateForSearch = (date) => {
    return moment(date, 'YYYY-MM-DD').toDate();
};
exports.dateForSearch = dateForSearch;
const isDateEqual = (first, second) => {
    const firstDate = new Date(first);
    const secondDate = new Date(second);
    const [firstYear, firstMonth, firstDay] = [
        firstDate.getFullYear(),
        firstDate.getMonth(),
        firstDate.getDate(),
    ];
    const [secondYear, secondMonth, secondDay] = [
        secondDate.getFullYear(),
        secondDate.getMonth(),
        secondDate.getDate(),
    ];
    return (firstYear === secondYear &&
        firstMonth === secondMonth &&
        firstDay === secondDay);
};
exports.isDateEqual = isDateEqual;
const strToDate = (value) => {
    return value ? (0, exports.date)(value, 'YYYY-MM-DD HH:SS:MM') : null;
};
exports.strToDate = strToDate;
//# sourceMappingURL=time.utils.js.map
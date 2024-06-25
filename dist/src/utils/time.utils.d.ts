import * as moment from 'moment';
export declare const t: (date?: string, format?: string) => moment.Moment;
export declare const now: () => string;
export declare const date: (date: string | Date, format?: string) => string;
export declare const isDateValid: (date: string) => boolean;
export declare const compareTime: (first: string | Date, second: string | Date) => number;
export declare const dateForSearch: (date: string) => Date;
export declare const isDateEqual: (first: string, second: string) => boolean;
export declare const strToDate: (value: string) => string;

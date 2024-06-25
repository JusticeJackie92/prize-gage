import { HttpStatus } from '@nestjs/common';
export declare const response: (status: 'success' | 'error' | string, title: string, message: string, code?: number, data?: any, meta?: any) => {
    status: string;
    title: string;
    message: string;
    data: any;
    meta: any;
};
export declare const success: (data: any, title?: string, message?: string, meta?: any) => {
    status: string;
    title: string;
    message: string;
    data: any;
    meta: any;
};
export declare const error: (title: string, message: string, code?: HttpStatus) => never;

export declare const hash: (text: string) => string;
export declare const compare: (text: string, hashedText: string) => boolean;
export declare const encrypt: (text: string) => string;
export declare const decrypt: (text: string) => string;
export declare const generateHmac: (payload: any, algo?: string) => string;
export declare const compareHmac: (mac: string, payload: any, algo?: string) => boolean;
export declare const toBase64: (str: string) => string;
export declare const fromBase64: (base64: string) => string;

import { UserRole } from '@prisma/client';
export declare class SignUpDto {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    password: string;
}

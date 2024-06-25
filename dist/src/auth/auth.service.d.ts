/// <reference types="cookie-parser" />
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { VerificationCodeDto } from './dto/verify-user.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    signUp(dto: SignUpDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    }>;
    verifyUser(dto: VerificationCodeDto): Promise<boolean>;
    markUserAsVerified(email: string): Promise<void>;
    signin(dto: SignInDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signToken(args: {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(args: {
        hash: string;
        password: string;
    }): Promise<boolean>;
    getCurrentUser(token: string): Promise<any>;
}

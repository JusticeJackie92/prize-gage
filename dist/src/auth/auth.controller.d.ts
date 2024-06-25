/// <reference types="cookie-parser" />
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Request as ExpressRequest } from 'express';
import { JwtService } from '@nestjs/jwt';
import { VerificationCodeDto } from './dto/verify-user.dto';
import { MailService } from 'src/mail/mail.service';
export declare class AuthController {
    private authService;
    private jwtService;
    private mailService;
    constructor(authService: AuthService, jwtService: JwtService, mailService: MailService);
    signup(dto: SignUpDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    }>;
    signin(req: any, res: any, dto: SignInDto): Promise<import("express").Response<any, Record<string, any>>>;
    signout(req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    getProfile(req: ExpressRequest): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        role: any;
    }>;
    verifyCode(dto: VerificationCodeDto): Promise<any>;
    sendOTP(email: string, otp: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
}

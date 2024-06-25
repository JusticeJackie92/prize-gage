"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../utils/constants");
const bcrypt = require("bcrypt");
const resend_1 = require("resend");
const resend = new resend_1.Resend('re_hcPYPiZ6_3S2AKLwaaVEyQzWAZWPiVbtX');
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async signUp(dto) {
        const { email, password, firstName, lastName, role } = dto;
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const userExists = await this.prisma.prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            throw new common_1.BadRequestException('Email already exists');
        }
        await this.prisma.prisma.otp.create({
            data: {
                email,
                code: otpCode,
            },
        });
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.prisma.prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                role: client_1.UserRole.USER,
                hashedPassword,
                isVerifed: false
            },
        });
        const { data, error } = await resend.emails.send({
            from: 'Prize Gage <info@ivicview.com.ng>',
            to: [email],
            subject: 'Email Verification',
            html: `<p>Your verification code is: <strong>${otpCode}</strong></p>`,
        });
        if (error) {
            console.error('Failed to send verification email:', error);
            throw new common_1.ForbiddenException('Failed to send verification email');
        }
        return {
            message: 'User created succefully', user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
            },
        };
    }
    async verifyUser(dto) {
        const { email, code } = dto;
        const otp = await this.prisma.prisma.otp.findFirst({
            where: { email, code }
        });
        return !!otp;
    }
    async markUserAsVerified(email) {
        await this.prisma.prisma.user.update({
            where: { email },
            data: { isVerifed: true },
        });
    }
    async signin(dto, req, res) {
        const { email, password } = dto;
        const foundUser = await this.prisma.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!foundUser) {
            throw new common_1.BadRequestException('Wrong credentials');
        }
        if (!foundUser.isVerifed) {
            throw new common_1.UnauthorizedException('Please verify your email before signing in');
        }
        const compareSuccess = await this.comparePasswords({
            password,
            hash: foundUser.hashedPassword,
        });
        if (!compareSuccess) {
            throw new common_1.BadRequestException('Wrong credentials');
        }
        const token = await this.signToken({
            userId: foundUser.id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: foundUser.role
        });
        if (!token) {
            throw new common_1.ForbiddenException('Could not signin');
        }
        res.cookie('token', token, { httpOnly: true, secure: true });
        console.log(token);
        return res.send({
            message: 'Logged in successfully',
            user: {
                id: foundUser.id,
                email: foundUser.email,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                role: foundUser.role,
            },
        });
    }
    async signout(req, res) {
        res.clearCookie('token');
        return res.send({ message: 'Logged out succefully' });
    }
    async signToken(args) {
        const payload = {
            id: args.userId,
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            role: args.role
        };
        const token = await this.jwt.signAsync(payload, {
            secret: constants_1.jwtSecret,
        });
        return token;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async comparePasswords(args) {
        return await bcrypt.compare(args.password, args.hash);
    }
    async getCurrentUser(token) {
        try {
            const decodedToken = this.jwt.verify(token, { secret: constants_1.jwtSecret });
            const { id, email, firstName, lastName, role } = decodedToken;
            return { id, email, firstName, lastName, role };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
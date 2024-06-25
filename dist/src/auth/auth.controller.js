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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const signup_dto_1 = require("./dto/signup.dto");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const common_2 = require("@nestjs/common");
const signin_dto_1 = require("./dto/signin.dto");
const http_only_guard_1 = require("./http-only.guard");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const verify_user_dto_1 = require("./dto/verify-user.dto");
const resend_otp_1 = require("./dto/resend-otp");
const reset_password_1 = require("./dto/reset-password");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    signup(dto) {
        return this.authService.signUp(dto);
    }
    async signin(req, res, dto) {
        return this.authService.signin(dto, req, res);
    }
    signout(req, res) {
        return this.authService.signout(req, res);
    }
    async getProfile(req) {
        const token = req.cookies.token;
        if (!token) {
            throw new common_2.UnauthorizedException('Token not provided');
        }
        const user = await this.authService.getCurrentUser(token);
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };
    }
    async verifyCode(dto) {
        const { email, code } = dto;
        if (!email || !code) {
            throw new common_2.BadRequestException('Email and code are required');
        }
        const isValid = await this.authService.verifyUser(dto);
        if (!isValid) {
            throw new common_2.BadRequestException('Invalid verification code');
        }
        await this.authService.markUserAsVerified(email);
        return { message: 'Verification successful' };
    }
    async forgotPassword(dto) {
        const { email } = dto;
        if (!email) {
            throw new common_2.BadRequestException('Email is required');
        }
        await this.authService.sendForgotPasswordOTP(email);
        return { message: 'Reset Password OTP sent successfully' };
    }
    async resetPassword(dto) {
        const { email, code, password } = dto;
        if (!email || !code || !password) {
            throw new common_2.BadRequestException('Email, code, and newPassword are required');
        }
        await this.authService.verifyUser({ email, code });
        await this.authService.resetPassword(email, password);
        return { message: 'Password reset successful' };
    }
    async resendOTP(dto) {
        if (!dto.email) {
            throw new common_2.BadRequestException('Email is required');
        }
        return this.authService.resendOTP(dto.email);
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, signin_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('signout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signout", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_2.UseGuards)(http_only_guard_1.HttpOnlyGuard),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_dto_1.VerificationCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyCode", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_otp_1.ResendOtp]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('resend-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_otp_1.ResendOtp]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOTP", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
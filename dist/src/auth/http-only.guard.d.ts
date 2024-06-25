import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class HttpOnlyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}

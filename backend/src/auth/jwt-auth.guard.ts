import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException({message: 'User is not authorized'});
        }
        try {
            const user = this.jwtService.verify(token);
            request['user'] = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'User is not authorized'})
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      // Add your custom authentication logic here if needed
      // For example, you can check whether the request is being made over HTTPS
      return super.canActivate(context);
    }
  
    handleRequest(err: any, user: any, info: any): any {
      // You can throw an exception based on the err or user object
      if (err || !user) {
        throw err || new UnauthorizedException('Invalid or missing token');
      }
      return user;
    }
  }
  
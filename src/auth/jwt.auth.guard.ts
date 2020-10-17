import { Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('loginGuard') {

  canActivate(context: ExecutionContext) {

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err) {
      console.log("error: ", err);
    }

    console.log("Info: ",info, user);
    return user;
  }
}
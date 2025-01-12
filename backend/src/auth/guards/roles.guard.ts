import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// Guard to check roles
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // user object contains roles, provided by JwtStrategy

    if (!user || !user.roles) {
      return false;
    }

    // Check if the user has the required role(s)
    // Adjust this to check for multiple roles or a single role based on your use case
    return user.roles.some(role => ['paid', 'admin'].includes(role));  // Example: check if 'paid' or 'admin' role exists
  }
}

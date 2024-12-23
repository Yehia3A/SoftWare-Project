import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/dto/RoleDto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No roles required
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User:', user);
    console.log('Required Roles:', requiredRoles);

    if (!user) {
      console.error('No user attached to request');
      return false; // User not authenticated
    }

    const hasRole = requiredRoles.includes(user.role);
    console.log('Has Required Role:', hasRole);

    return hasRole;
  }
}


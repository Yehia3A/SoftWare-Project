import { SetMetadata } from '@nestjs/common';
import { Role } from '../dto/RoleDto';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

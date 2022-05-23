import { SetMetadata } from '@nestjs/common';
import Permission from 'src/common/constants/permission';

export const Permissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions);

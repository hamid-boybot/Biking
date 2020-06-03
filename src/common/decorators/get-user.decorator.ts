import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/user.entity';

export const getUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    let user = request.user;
    let id = user.id_user;
    console.log('iddecois' + id);
    console.log('useconttroll' + JSON.stringify(user));
    return user;
  },
);

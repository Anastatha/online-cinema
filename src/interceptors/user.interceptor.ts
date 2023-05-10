import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserEntity } from 'src/users/user.entity';

export class UserInterceptors implements NestInterceptor {
 intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
        map(response => {
            if(Array.isArray(response)){
                return response.map((item: UserEntity)=>{
                    const res = {
                        ...item,
                    };
                    delete res.password
                    return res
                })
            } else {
                delete response.password;
                return response;
            }
        })
    )
 }
}

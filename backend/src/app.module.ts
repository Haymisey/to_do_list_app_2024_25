import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // Default MySQL port
      username: 'root', // The user you created
      password: '', // The password for that user
      database: 'to_do_list', // The database you created
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to true for automatic schema syncing (use cautiously in production)
    }),
    TodoModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}

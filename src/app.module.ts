import { Module } from '@nestjs/common';
import { MenuModule } from './sys/menu/menu.module';
import { UserModule } from './sys/user/user.module';
import {TypeOrmModule}from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ljb123456,',
      database: 'ztyj',
      synchronize: true,
      logging:true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      poolSize: 10,
      timezone: '+08:00',
    }),
    MenuModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

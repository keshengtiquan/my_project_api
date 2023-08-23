import { Module } from '@nestjs/common';
import { TenantModule } from './sys/tenant/tenant.module';
import { TenantpackageModule } from './sys/tenantpackage/tenantpackage.module';
import { DeptModule } from './sys/dept/dept.module';
import { UserModule } from './sys/user/user.module';
import { PostModule } from './sys/post/post.module';
import { RoleModule } from './sys/role/role.module';
import { MenuModule } from './sys/menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './sys/auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { ProjectlistModule } from './progress/projectlist/projectlist.module';
import { ExcelController } from './excel/excel.controller';
import { ExcelService } from './excel/excel.service';
import { ExcelModule } from './excel/excel.module';

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
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      poolSize: 10,
      timezone: '+08:00',
    }),
    JwtModule.register({
      global: true,
      secret: 'lijianbo',
      signOptions: {
        expiresIn: '1D',
      },
    }),
    TenantModule,
    TenantpackageModule,
    DeptModule,
    UserModule,
    PostModule,
    RoleModule,
    MenuModule,
    AuthModule,
    RedisModule,
    ProjectlistModule,
    ExcelModule,
  ],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class AppModule {}

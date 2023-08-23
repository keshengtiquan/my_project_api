import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { Auth } from './decorators/auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/userinfo')
  @HttpCode(200)
  @Auth()
  getUserInfo(@Req() req) {
    return req.user;
  }
}

import { Controller, Post, Body } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dtos/login.dto';

  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }
  }
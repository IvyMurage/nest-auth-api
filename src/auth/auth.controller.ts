import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }


  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return  this.authService.login(loginDto);
  }
}

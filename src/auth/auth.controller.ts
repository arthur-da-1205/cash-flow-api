import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto, UserSigninDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() payload: UserSigninDto) {
    return this.authService.signin(payload);
  }

  @Post('user/create')
  createUser(@Body() payload: UserCreateDto) {
    return this.authService.createUser(payload);
  }
}

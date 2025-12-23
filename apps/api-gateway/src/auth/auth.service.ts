import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  getHello() {
    return this.authClient.send('get-hello', {});
  }

  register(dto: RegisterDto) {
    return this.authClient.send('register', dto);
  }

  login(dto: LoginDto) {
    return this.authClient.send('login', dto);
  }
}

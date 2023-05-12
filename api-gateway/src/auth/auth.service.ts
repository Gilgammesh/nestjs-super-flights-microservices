import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { CreateUserDto } from 'src/users/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}

  private clientProxyUser = this.clientProxy.clientProxyUsers();

  async validateUser(username: string, password: string) {
    const user = await this.clientProxyUser
      .send(UserMSG.VALID, {
        username,
        password,
      })
      .toPromise();
    if (user) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return { acces_token: this.jwtService.sign(payload) };
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.clientProxyUser
      .send(UserMSG.CREATE, createUserDto)
      .toPromise();
  }
}

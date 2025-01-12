// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'e451b21a11984bb6f3658f2e61014858d7642b32e588ed15e949d9f475257ac5ba63b609f92eb77432f663a37e6938d351bcb7e25797e4432adb576084043b29ab3b203cbafc74d74e11f468ab5f01b82b6b5473448239304551d9536011af067867f510e3971fa3aaf65cb3ff0824e23355f5bc8d17c3f2033a78de0831c8aa191a6d65965445a238679610c08e92014423c582672124793789365482a7822806bb09aa1ac0f265684f68b510de746553735ddf45d253085a5c151f596be90e5ce5a2256d0040b66f69b643f614799c9abcc28ee14bffe3c127965762a5366eb8207b249251bfd6c4288fc201ce13af53f10441bc5abf6b9bf950d386b1f160', // Replace with your secret key
    });
  }
  // Validate the JWT payload and return user information
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

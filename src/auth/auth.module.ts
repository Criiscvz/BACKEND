import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants/jwt.constant';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: JwtConstants.secret,
      //tiempo de expiracion del token
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

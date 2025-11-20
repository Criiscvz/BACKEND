import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants/jwt.constant';

@Module({
  imports: [
    UsuarioModule,
    //el JwtModule.register es para configurar el modulo de jwt
    JwtModule.register({
      //global: true hace que el modulo sea global y no sea necesario importarlo en otros modulos
      global: true,
      //secret es la clave secreta para firmar los tokens
      secret: JwtConstants.secret,
      //tiempo de expiracion del token
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

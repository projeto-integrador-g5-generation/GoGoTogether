import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VeiculoModule } from './veiculo/veiculo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ViagemModule } from './viagem/viagem.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { DevService } from './data/service/dev.service';
import { ProdService } from './data/service/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    VeiculoModule,
    UsuarioModule,
    ViagemModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

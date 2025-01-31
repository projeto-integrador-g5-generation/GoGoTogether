import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viagem } from './entities/viagem.entity';
import { ViagemController } from './controllers/viagem.controller';
import { ViagemService } from './services/viagem.service';
import { VeiculoModule } from '../veiculo/veiculo.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { VeiculoService } from '../veiculo/services/veiculo.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Viagem]),
    VeiculoModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [ViagemController],
  providers: [ViagemService, VeiculoService],
  exports: [TypeOrmModule],
})
export class ViagemModule {}

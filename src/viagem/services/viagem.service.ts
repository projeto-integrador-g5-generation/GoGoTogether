import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Viagem } from '../entities/viagem.entity';
import { VeiculoService } from '../../veiculo/services/veiculo.service';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Injectable()
export class ViagemService {
  constructor(
    @InjectRepository(Viagem)
    private viagemRepository: Repository<Viagem>,
    private veiculoService: VeiculoService,
    private usuarioService: UsuarioService,
  ) {}

  async findAll(): Promise<Viagem[]> {
    return this.viagemRepository.find({
      relations: { veiculo: true, usuario: true },
    });
  }

  async findById(id: number): Promise<Viagem> {
    const viagem = await this.viagemRepository.findOne({
      where: { id },
      relations: { veiculo: true, usuario: true },
    });

    if (!viagem) {
      throw new HttpException('Viagem não encontrada.', HttpStatus.NOT_FOUND);
    }

    return viagem;
  }

  async findByStatus(status: string): Promise<Viagem[]> {
    return this.viagemRepository.find({
      where: { status_viagem: ILike(`%${status}%`) },
      relations: { veiculo: true, usuario: true },
    });
  }

  async create(viagem: Viagem): Promise<Viagem> {
    const veiculo = await this.veiculoService.findById(viagem.veiculo.id);

    if (veiculo.assentos_disponiveis <= 0) {
      throw new HttpException(
        'Esse veículo não possui mais assentos disponíveis.',
        HttpStatus.BAD_REQUEST,
      );
    }

    veiculo.assentos_disponiveis = veiculo.assentos_disponiveis - 1;

    await this.usuarioService.findById(viagem.usuario.id);

    await this.veiculoService.update(veiculo);

    viagem.duracao_estimada = this.calcularDuracaoViagem(
      viagem.distancia,
      viagem.velocidade_media,
    );
    return await this.viagemRepository.save(viagem);
  }

  async update(viagem: Viagem): Promise<Viagem> {
    await this.findById(viagem.id);

    await this.veiculoService.findById(viagem.veiculo.id);
    await this.usuarioService.findById(viagem.usuario.id);

    viagem.duracao_estimada = this.calcularDuracaoViagem(
      viagem.distancia,
      viagem.velocidade_media,
    );
    return await this.viagemRepository.save(viagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.viagemRepository.delete(id);
  }

  private calcularDuracaoViagem(
    distancia: number,
    velocidadeMedia: number,
  ): number {
    if (velocidadeMedia <= 0) {
      throw new HttpException(
        'Velocidade média deve ser maior que zero.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return parseFloat(((distancia / velocidadeMedia) * 60).toFixed(2));
  }
}

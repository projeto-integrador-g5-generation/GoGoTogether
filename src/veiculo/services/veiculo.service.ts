import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Veiculo } from '../entities/veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
  ) {}

  async findAll(): Promise<Veiculo[]> {
    return this.veiculoRepository.find({
      relations: { viagem: true },
    });
  }

  async findById(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOne({
      where: {
        id,
      },
      relations: { viagem: true },
    });

    if (!veiculo)
      throw new HttpException('Veículo não encontrado!', HttpStatus.NOT_FOUND);

    return veiculo;
  }

  async findByModelo(modelo: string): Promise<Veiculo[]> {
    return this.veiculoRepository.find({
      where: {
        modelo: ILike(`%${modelo}%`),
      },
      relations: { viagem: true },
    });
  }

  async findByCategoria(categoria: string): Promise<Veiculo[]> {
    return this.veiculoRepository.find({
      where: {
        categoria: ILike(`%${categoria}%`),
      },
      relations: { viagem: true },
    });
  }

  async create(veiculo: Veiculo): Promise<Veiculo> {
    return await this.veiculoRepository.save(veiculo);
  }

  async update(veiculo: Veiculo): Promise<Veiculo> {
    await this.findById(veiculo.id);

    return await this.veiculoRepository.save(veiculo);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.veiculoRepository.delete(id);
  }
}

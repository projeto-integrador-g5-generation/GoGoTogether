import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Viagem } from "../entities/viagem.entity";

@Injectable()
export class ViagemService{
    constructor(
        @InjectRepository(Viagem)
        private viagemRepository: Repository<Viagem>
    ){}

    async findAll(): Promise<Viagem[]>{
        return this.viagemRepository.find();
    }

    async findById(id: number): Promise<Viagem>{
        const viagem = await this.viagemRepository.findOne({where: {id}})

        if(!viagem){
            throw new HttpException('Viagem não encontrada.', HttpStatus.NOT_FOUND)
        }

        return viagem;
    }

    async findByStatus(status: string): Promise<Viagem[]>{
        return this.viagemRepository.find({where: {status_viagem: ILike(`%${status}%`)}, });
    }

    async create(viagem: Viagem): Promise<Viagem>{
        viagem.duracao_estimada = this.calcularDuracaoViagem(viagem.distancia, viagem.velocidade_media)
        return await this.viagemRepository.save(viagem);
    }

    async update(viagem: Viagem): Promise<Viagem>{
        await this.findById(viagem.id)
        viagem.duracao_estimada = this.calcularDuracaoViagem(viagem.distancia, viagem.velocidade_media)
        return await this.viagemRepository.save(viagem);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        return await this.viagemRepository.delete(id)
    }

    private calcularDuracaoViagem(distancia: number, velocidadeMedia: number): number {
        if (velocidadeMedia <= 0) {
            throw new HttpException('Velocidade média deve ser maior que zero.', HttpStatus.BAD_REQUEST);
        }
        return parseFloat(((distancia / velocidadeMedia) * 60).toFixed(2)); 
    }

}
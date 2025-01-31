import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Viagem } from '../../viagem/entities/viagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_veiculos' })
export class Veiculo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  modelo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  marca: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  @ApiProperty()
  ano: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  cor: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  categoria: string;

  @IsNotEmpty()
  @Column({ length: 5000, nullable: false })
  @ApiProperty()
  foto: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 8, nullable: false })
  @ApiProperty()
  placa: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  combustivel: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  @ApiProperty()
  capacidade: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  @ApiProperty()
  assentos_disponiveis: number;

  @CreateDateColumn()
  @ApiProperty()
  criado_em: Date;

  @UpdateDateColumn()
  @ApiProperty()
  atualizado_em: Date;

  @ApiProperty({ type: () => Viagem })
  @OneToMany(() => Viagem, (viagem) => viagem.veiculo)
  viagem: Viagem[];
}

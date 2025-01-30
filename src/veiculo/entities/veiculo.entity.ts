import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity({ name: 'tb_veiculos' })
export class Veiculo {


  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  modelo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  marca: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  ano: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  cor: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  categoria: string;

  @IsNotEmpty()
  @Column({ length: 5000, nullable: false })
  foto: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 8, nullable: false })
  placa: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  combustivel: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  capacidade: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  assentos_disponiveis: number;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

  //@OneToMany(() => Viagem, (viagem) => viagem.veiculo)
  //viagem: Viagem[];
}
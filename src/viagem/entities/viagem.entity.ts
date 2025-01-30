import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDateString,
  IsString,
  IsIn,
} from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  IsNull,
} from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';


@Entity({ name: 'tb_viagens' }) 
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ length: 255, nullable: false })
  origem: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ length: 255, nullable: false })
  destino: string;

  @IsNotEmpty()
  @IsDateString()
  @Column({ type: 'datetime', nullable: false })
  data_hora_partida: Date;

  @IsNumber({maxDecimalPlaces: 2})
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  preco: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['agendada', 'em_andamento', 'concluida', 'cancelada']) 
  @Column({ length: 50, nullable: false })
  status_viagem: string;

  @IsNumber()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
    nullable: false,
  })
  distancia: number; 

  @IsNumber()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
    nullable: false,
  })
  velocidade_media: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
    nullable: true, 
  })
  duracao_estimada: number; 

  @CreateDateColumn({ name: 'criado_at' })
  criado_at: Date;

  @UpdateDateColumn({ name: 'atualizado_at' })
  atualizado_at: Date;
}

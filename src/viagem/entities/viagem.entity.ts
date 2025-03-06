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
  ManyToOne,
} from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_viagens' })
export class Viagem {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  origem: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  destino: string;

  @IsNotEmpty()
  @IsDateString()
  @Column({ type: 'timestamp', nullable: false })
  @ApiProperty()
  data_hora_partida: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  @ApiProperty()
  preco: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  status_viagem: number;

  @IsNumber()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
    nullable: false,
  })
  @ApiProperty()
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
  @ApiProperty()
  velocidade_media: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
    nullable: true,
  })
  duracao_estimada: number;

  @ApiProperty({ type: () => Veiculo })
  @ManyToOne(() => Veiculo, (veiculo) => veiculo.viagem, {
    onDelete: 'CASCADE',
  })
  veiculo: Veiculo;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.viagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ApiProperty()
  @CreateDateColumn({ name: 'criado_at' })
  criado_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'atualizado_at' })
  atualizado_at: Date;
}

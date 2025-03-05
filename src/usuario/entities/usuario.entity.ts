import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
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

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 14, nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  data_nascimento: Date;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  tipo_usuario: string;

  @Column({ length: 14, nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({example: 'email@email.com'})
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @ApiProperty({type: () => Viagem})
  @OneToMany(() => Viagem, (viagem) => viagem.usuario)
  viagem: Viagem[];

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;
}

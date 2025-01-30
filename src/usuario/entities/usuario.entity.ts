import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()  
    id: number

    @Column({ length: 14, nullable: false})
    @IsNotEmpty()
    cpf: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string;

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    data_nascimento: Date;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    tipo_usuario: string;

    @Column({length: 14, nullable: false})
    @IsNotEmpty()
    telefone: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    usuario: string;

    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;

    @Column({ length: 5000 })
    foto: string;


    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    
}



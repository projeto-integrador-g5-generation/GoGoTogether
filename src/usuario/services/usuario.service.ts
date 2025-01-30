import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { ILike, Repository } from "typeorm";
import { differenceInYears, isBefore } from 'date-fns';

export function validarIdade(
  dataNascimento: string | Date,
  idadeMinima: number = 18
): void {
  const dataNascimentoDate = new Date(dataNascimento);
  const dataAtual = new Date();

  // Calcular a diferença em anos
  let idade = differenceInYears(dataAtual, dataNascimentoDate);

  // Ajustar a idade se o aniversário não ocorreu ainda este ano
  if (isBefore(dataAtual, new Date(dataAtual.getFullYear(), dataNascimentoDate.getMonth(), dataNascimentoDate.getDate()))) {
    idade--;
  }

  // Verificar se a idade é inferior à mínima
  if (idade < idadeMinima) {
    throw new HttpException('Usuário com idade inferior à permitida.', HttpStatus.BAD_REQUEST);
  }
}





@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}
    
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
           
        });
    }


    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { 
                id 
            },
        })
        
        if(!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)

        return usuario;
    }



    async findByTipo(tipo_usuario: string): Promise<Usuario[]> {
        const usuarios = await this.usuarioRepository.find({
            where: {
              tipo_usuario: ILike(`%${tipo_usuario}%`), // Permite que "moto" pegue "motociclista", por exemplo
            },
          });
        
          // Se não encontrar nenhum usuário com o tipo informado, lançar exceção
          if (usuarios.length === 0) {
            throw new HttpException('Tipo de usuário inválido.', HttpStatus.BAD_REQUEST);
          }
        
          return usuarios;
        }





     // Método auxiliar para Validação do Usuário
     async findByUsuario(usuario: string): Promise<Usuario | undefined>{
        return await this.usuarioRepository.findOne({
            where:{
                usuario: usuario
            }
        })
    }


    async create(usuario: Usuario): Promise<Usuario>{

        const buscaUsuario = await this.findByUsuario(usuario.usuario)

        if(buscaUsuario)
            throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST)

        validarIdade(usuario.data_nascimento);

        return await this.usuarioRepository.save(usuario);
    }


   
    async update(usuario: Usuario): Promise<Usuario>{

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario)

        if(buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException("Usuário (e-mail) já cadastrado!", HttpStatus.BAD_REQUEST)

        validarIdade(usuario.data_nascimento);

        return await this.usuarioRepository.save(usuario);
    }







}
import { IsEmail, IsString } from 'class-validator';

export class UsuarioLogin {
  @IsEmail()
  public usuario: string;

  @IsString()
  public senha: string;
}

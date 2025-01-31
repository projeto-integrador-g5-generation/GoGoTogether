import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UsuarioLogin {
  @IsEmail()
  @ApiProperty()
  public usuario: string;

  @IsString()
  @ApiProperty()
  public senha: string;
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async criptografarSenha(senha: string) {
    return await bcrypt.hash(senha, parseInt(process.env.SALT) || 10);
  }

  async compararSenhas(senhaDigitada: string, senhaBanco: string) {
    return await bcrypt.compare(senhaDigitada, senhaBanco);
  }
}

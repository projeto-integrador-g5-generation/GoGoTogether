import { HttpException, HttpStatus } from '@nestjs/common';
import { differenceInYears, isBefore } from 'date-fns';

export function validarIdade(
  dataNascimento: string | Date,
  idadeMinima: number = 18,
): void {
  const dataNascimentoDate = new Date(dataNascimento);
  const dataAtual = new Date();

  // Calcular a diferença em anos
  let idade = differenceInYears(dataAtual, dataNascimentoDate);

  // Ajustar a idade se o aniversário não ocorreu ainda este ano
  if (
    isBefore(
      dataAtual,
      new Date(
        dataAtual.getFullYear(),
        dataNascimentoDate.getMonth(),
        dataNascimentoDate.getDate(),
      ),
    )
  ) {
    idade--;
  }

  // Verificar se a idade é inferior à mínima
  if (idade < idadeMinima) {
    throw new HttpException(
      'Usuário com idade inferior à permitida.',
      HttpStatus.BAD_REQUEST,
    );
  }
}

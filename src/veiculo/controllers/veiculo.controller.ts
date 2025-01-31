import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VeiculoService } from '../services/veiculo.service';
import { Veiculo } from '../entities/veiculo.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Veiculo')
@UseGuards(JwtAuthGuard)
@Controller('/veiculos')
@ApiBearerAuth()
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Veiculo[]> {
    return this.veiculoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Veiculo> {
    return this.veiculoService.findById(id);
  }

  @Get('/modelo/:modelo')
  @HttpCode(HttpStatus.OK)
  findByModelo(@Param('modelo') modelo: string): Promise<Veiculo[]> {
    return this.veiculoService.findByModelo(modelo);
  }

  @Get('/categoria/:categoria')
  @HttpCode(HttpStatus.OK)
  findByCategoria(@Param('categoria') categoria: string): Promise<Veiculo[]> {
    return this.veiculoService.findByCategoria(categoria);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoService.create(veiculo);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoService.update(veiculo);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.veiculoService.delete(id);
  }
}

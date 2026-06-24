import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  // POST /carreras
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCarreraDto) {
    const data = await this.carrerasService.create(dto);
    return {
      message: 'Carrera y materias creadas exitosamente.',
      data,
    };
  }
}

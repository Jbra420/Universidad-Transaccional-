import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LaboratoriosService } from './laboratorios.service';
import { AsignarLaboratorioDto } from './dto/asignar-laboratorio.dto';

@Controller('laboratorios')
export class LaboratoriosController {
  constructor(private readonly laboratoriosService: LaboratoriosService) {}

  // POST /laboratorios/asignar
  @Post('asignar')
  @HttpCode(HttpStatus.CREATED)
  async asignar(@Body() dto: AsignarLaboratorioDto) {
    const data = await this.laboratoriosService.asignar(dto);
    return {
      message: 'Laboratorio asignado exitosamente.',
      data,
    };
  }
}

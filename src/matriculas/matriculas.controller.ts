import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { AsignarLugarDto } from './dto/asignar-lugar.dto';

@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  // POST /matriculas/asignar-lugar
  @Post('asignar-lugar')
  @HttpCode(HttpStatus.CREATED)
  async asignarLugar(@Body() dto: AsignarLugarDto) {
    const data = await this.matriculasService.asignarLugar(dto);
    return {
      message: `${data.length} asignación(es) de lugar creadas exitosamente.`,
      data,
    };
  }
}

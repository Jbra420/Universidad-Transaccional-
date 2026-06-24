import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AsignarLaboratorioDto } from './dto/asignar-laboratorio.dto';

@Injectable()
export class LaboratoriosService {
  constructor(private readonly prisma: PrismaService) {}

  async asignar(dto: AsignarLaboratorioDto) {
    const { laboratorioId, cicloId, materiaId } = dto;

    // 1. Ciclo debe existir y estar activo
    const ciclo = await this.prisma.ciclo.findUnique({ where: { id: cicloId } });
    if (!ciclo)
      throw new BadRequestException(`El ciclo con id ${cicloId} no existe.`);
    if (!ciclo.activo)
      throw new BadRequestException(`El ciclo "${ciclo.nombre}" no está activo.`);

    // 2. Debe existir al menos una matrícula activa en ese ciclo
    const matriculaActiva = await this.prisma.matricula.findFirst({
      where: { cicloId, activo: true },
    });
    if (!matriculaActiva)
      throw new BadRequestException(
        `No existen matrículas activas en el ciclo "${ciclo.nombre}".`,
      );

    // 3. Materia debe existir
    const materia = await this.prisma.materia.findUnique({ where: { id: materiaId } });
    if (!materia)
      throw new BadRequestException(`La materia con id ${materiaId} no existe.`);

    // 4. Laboratorio debe existir
    const laboratorio = await this.prisma.laboratorio.findUnique({
      where: { id: laboratorioId },
    });
    if (!laboratorio)
      throw new BadRequestException(`El laboratorio con id ${laboratorioId} no existe.`);

    // 5. Crear la asignación
    return this.prisma.asignacionLaboratorio.create({
      data: { laboratorioId, cicloId, materiaId },
      include: {
        laboratorio: true,
        ciclo: true,
        materia: { include: { carrera: true } },
      },
    });
  }
}

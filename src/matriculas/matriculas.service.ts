import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AsignarLugarDto } from './dto/asignar-lugar.dto';

@Injectable()
export class MatriculasService {
  constructor(private readonly prisma: PrismaService) {}

  async asignarLugar(dto: AsignarLugarDto) {
    const { cicloId, carreraId } = dto;

    // 1. Ciclo debe existir y estar activo
    const ciclo = await this.prisma.ciclo.findUnique({ where: { id: cicloId } });
    if (!ciclo)
      throw new BadRequestException(`El ciclo con id ${cicloId} no existe.`);
    if (!ciclo.activo)
      throw new BadRequestException(`El ciclo "${ciclo.nombre}" no está activo.`);

    // 2. Carrera debe existir
    const carrera = await this.prisma.carrera.findUnique({ where: { id: carreraId } });
    if (!carrera)
      throw new BadRequestException(`La carrera con id ${carreraId} no existe.`);

    // 3. Debe existir al menos un estudiante en esa carrera
    const estudianteCount = await this.prisma.estudiante.count({
      where: { carreraId },
    });
    if (estudianteCount === 0)
      throw new BadRequestException(
        `No existen estudiantes registrados para la carrera "${carrera.nombre}".`,
      );

    // 4. Deben existir matrículas activas en ese ciclo para esa carrera
    const matriculasActivas = await this.prisma.matricula.findMany({
      where: {
        cicloId,
        activo: true,
        estudiante: { carreraId },
      },
      include: { estudiante: true },
    });
    if (matriculasActivas.length === 0)
      throw new BadRequestException(
        `No existen matrículas activas en el ciclo "${ciclo.nombre}" para la carrera "${carrera.nombre}".`,
      );

    // 5. Debe existir al menos un laboratorio
    const laboratorio = await this.prisma.laboratorio.findFirst();
    if (!laboratorio)
      throw new BadRequestException('No existen laboratorios registrados.');

    // 6. Crear una AsignacionLugar por cada matrícula activa (transacción)
    return this.prisma.$transaction(
      matriculasActivas.map((matricula) =>
        this.prisma.asignacionLugar.create({
          data: {
            matriculaId: matricula.id,
            laboratorioId: laboratorio.id,
            cicloId,
          },
          include: {
            matricula: { include: { estudiante: true } },
            laboratorio: true,
            ciclo: true,
          },
        }),
      ),
    );
  }
}

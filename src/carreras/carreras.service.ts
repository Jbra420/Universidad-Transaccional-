import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCarreraDto) {
    // Transacción: crea la carrera y todas sus materias de forma atómica
    return this.prisma.$transaction(async (tx) => {
      return tx.carrera.create({
        data: {
          nombre: dto.carrera,
          materias: {
            // Nested write: crea todas las materias en la misma operación
            create: dto.materias.map((nombre) => ({ nombre })),
          },
        },
        include: { materias: true },
      });
    });
  }
}

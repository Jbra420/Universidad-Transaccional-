import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CarrerasModule } from './carreras/carreras.module';
import { MatriculasModule } from './matriculas/matriculas.module';
import { LaboratoriosModule } from './laboratorios/laboratorios.module';

@Module({
  imports: [
    // Carga automática del .env en toda la app
    ConfigModule.forRoot({ isGlobal: true }),
    // Módulo global de Prisma (disponible en todos los módulos)
    PrismaModule,
    // Módulos de dominio
    CarrerasModule,
    MatriculasModule,
    LaboratoriosModule,
  ],
})
export class AppModule {}

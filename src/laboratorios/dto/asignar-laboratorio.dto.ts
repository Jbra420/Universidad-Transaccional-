import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AsignarLaboratorioDto {
  @Type(() => Number)
  @IsInt({ message: '"laboratorioId" debe ser un número entero.' })
  @IsPositive({ message: '"laboratorioId" debe ser positivo.' })
  laboratorioId: number;

  @Type(() => Number)
  @IsInt({ message: '"cicloId" debe ser un número entero.' })
  @IsPositive({ message: '"cicloId" debe ser positivo.' })
  cicloId: number;

  @Type(() => Number)
  @IsInt({ message: '"materiaId" debe ser un número entero.' })
  @IsPositive({ message: '"materiaId" debe ser positivo.' })
  materiaId: number;
}

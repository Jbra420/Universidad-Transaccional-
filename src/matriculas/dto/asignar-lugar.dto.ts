import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AsignarLugarDto {
  @Type(() => Number)
  @IsInt({ message: '"cicloId" debe ser un número entero.' })
  @IsPositive({ message: '"cicloId" debe ser positivo.' })
  cicloId: number;

  @Type(() => Number)
  @IsInt({ message: '"carreraId" debe ser un número entero.' })
  @IsPositive({ message: '"carreraId" debe ser positivo.' })
  carreraId: number;
}

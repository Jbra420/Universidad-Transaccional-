import { IsString, IsArray, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  @IsNotEmpty({ message: '"carrera" no puede estar vacío.' })
  carrera: string;

  @IsArray({ message: '"materias" debe ser un array.' })
  @ArrayNotEmpty({ message: '"materias" no puede ser un array vacío.' })
  @IsString({ each: true, message: 'Cada materia debe ser un string.' })
  materias: string[];
}

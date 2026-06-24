import { PrismaService } from '../prisma/prisma.service';
import { AsignarLugarDto } from './dto/asignar-lugar.dto';
export declare class MatriculasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    asignarLugar(dto: AsignarLugarDto): Promise<({
        ciclo: {
            id: number;
            nombre: string;
            activo: boolean;
        };
        matricula: {
            estudiante: {
                id: number;
                nombre: string;
                carreraId: number;
            };
        } & {
            id: number;
            cicloId: number;
            activo: boolean;
            estudianteId: number;
        };
        laboratorio: {
            id: number;
            nombre: string;
        };
    } & {
        id: number;
        laboratorioId: number;
        cicloId: number;
        matriculaId: number;
    })[]>;
}

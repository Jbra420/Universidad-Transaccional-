import { PrismaService } from '../prisma/prisma.service';
import { AsignarLaboratorioDto } from './dto/asignar-laboratorio.dto';
export declare class LaboratoriosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    asignar(dto: AsignarLaboratorioDto): Promise<{
        materia: {
            carrera: {
                id: number;
                nombre: string;
            };
        } & {
            id: number;
            nombre: string;
            carreraId: number;
        };
        ciclo: {
            id: number;
            nombre: string;
            activo: boolean;
        };
        laboratorio: {
            id: number;
            nombre: string;
        };
    } & {
        id: number;
        laboratorioId: number;
        cicloId: number;
        materiaId: number;
    }>;
}

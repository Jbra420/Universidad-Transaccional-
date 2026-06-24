import { LaboratoriosService } from './laboratorios.service';
import { AsignarLaboratorioDto } from './dto/asignar-laboratorio.dto';
export declare class LaboratoriosController {
    private readonly laboratoriosService;
    constructor(laboratoriosService: LaboratoriosService);
    asignar(dto: AsignarLaboratorioDto): Promise<{
        message: string;
        data: {
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
        };
    }>;
}

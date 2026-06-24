import { MatriculasService } from './matriculas.service';
import { AsignarLugarDto } from './dto/asignar-lugar.dto';
export declare class MatriculasController {
    private readonly matriculasService;
    constructor(matriculasService: MatriculasService);
    asignarLugar(dto: AsignarLugarDto): Promise<{
        message: string;
        data: ({
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
        })[];
    }>;
}

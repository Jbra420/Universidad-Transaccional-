import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
export declare class CarrerasController {
    private readonly carrerasService;
    constructor(carrerasService: CarrerasService);
    create(dto: CreateCarreraDto): Promise<{
        message: string;
        data: {
            materias: {
                id: number;
                nombre: string;
                carreraId: number;
            }[];
        } & {
            id: number;
            nombre: string;
        };
    }>;
}

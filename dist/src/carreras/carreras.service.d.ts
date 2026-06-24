import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
export declare class CarrerasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCarreraDto): Promise<{
        materias: {
            id: number;
            nombre: string;
            carreraId: number;
        }[];
    } & {
        id: number;
        nombre: string;
    }>;
}

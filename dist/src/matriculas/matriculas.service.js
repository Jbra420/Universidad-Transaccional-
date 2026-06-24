"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatriculasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MatriculasService = class MatriculasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async asignarLugar(dto) {
        const { cicloId, carreraId } = dto;
        const ciclo = await this.prisma.ciclo.findUnique({ where: { id: cicloId } });
        if (!ciclo)
            throw new common_1.BadRequestException(`El ciclo con id ${cicloId} no existe.`);
        if (!ciclo.activo)
            throw new common_1.BadRequestException(`El ciclo "${ciclo.nombre}" no está activo.`);
        const carrera = await this.prisma.carrera.findUnique({ where: { id: carreraId } });
        if (!carrera)
            throw new common_1.BadRequestException(`La carrera con id ${carreraId} no existe.`);
        const estudianteCount = await this.prisma.estudiante.count({
            where: { carreraId },
        });
        if (estudianteCount === 0)
            throw new common_1.BadRequestException(`No existen estudiantes registrados para la carrera "${carrera.nombre}".`);
        const matriculasActivas = await this.prisma.matricula.findMany({
            where: {
                cicloId,
                activo: true,
                estudiante: { carreraId },
            },
            include: { estudiante: true },
        });
        if (matriculasActivas.length === 0)
            throw new common_1.BadRequestException(`No existen matrículas activas en el ciclo "${ciclo.nombre}" para la carrera "${carrera.nombre}".`);
        const laboratorio = await this.prisma.laboratorio.findFirst();
        if (!laboratorio)
            throw new common_1.BadRequestException('No existen laboratorios registrados.');
        return this.prisma.$transaction(matriculasActivas.map((matricula) => this.prisma.asignacionLugar.create({
            data: {
                matriculaId: matricula.id,
                laboratorioId: laboratorio.id,
                cicloId,
            },
            include: {
                matricula: { include: { estudiante: true } },
                laboratorio: true,
                ciclo: true,
            },
        })));
    }
};
exports.MatriculasService = MatriculasService;
exports.MatriculasService = MatriculasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MatriculasService);
//# sourceMappingURL=matriculas.service.js.map
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
exports.LaboratoriosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LaboratoriosService = class LaboratoriosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async asignar(dto) {
        const { laboratorioId, cicloId, materiaId } = dto;
        const ciclo = await this.prisma.ciclo.findUnique({ where: { id: cicloId } });
        if (!ciclo)
            throw new common_1.BadRequestException(`El ciclo con id ${cicloId} no existe.`);
        if (!ciclo.activo)
            throw new common_1.BadRequestException(`El ciclo "${ciclo.nombre}" no está activo.`);
        const matriculaActiva = await this.prisma.matricula.findFirst({
            where: { cicloId, activo: true },
        });
        if (!matriculaActiva)
            throw new common_1.BadRequestException(`No existen matrículas activas en el ciclo "${ciclo.nombre}".`);
        const materia = await this.prisma.materia.findUnique({ where: { id: materiaId } });
        if (!materia)
            throw new common_1.BadRequestException(`La materia con id ${materiaId} no existe.`);
        const laboratorio = await this.prisma.laboratorio.findUnique({
            where: { id: laboratorioId },
        });
        if (!laboratorio)
            throw new common_1.BadRequestException(`El laboratorio con id ${laboratorioId} no existe.`);
        return this.prisma.asignacionLaboratorio.create({
            data: { laboratorioId, cicloId, materiaId },
            include: {
                laboratorio: true,
                ciclo: true,
                materia: { include: { carrera: true } },
            },
        });
    }
};
exports.LaboratoriosService = LaboratoriosService;
exports.LaboratoriosService = LaboratoriosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LaboratoriosService);
//# sourceMappingURL=laboratorios.service.js.map
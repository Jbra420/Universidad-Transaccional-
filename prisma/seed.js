require('dotenv/config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Clean existing data (in reverse dependency order)
  await prisma.asignacionLaboratorio.deleteMany();
  await prisma.asignacionLugar.deleteMany();
  await prisma.matricula.deleteMany();
  await prisma.estudiante.deleteMany();
  await prisma.materia.deleteMany();
  await prisma.carrera.deleteMany();
  await prisma.ciclo.deleteMany();
  await prisma.laboratorio.deleteMany();

  console.log('  ✓ Datos anteriores eliminados.');

  // 1. Create Ciclo activo
  const ciclo = await prisma.ciclo.create({
    data: {
      nombre: 'Ciclo 2025-I',
      activo: true,
    },
  });
  console.log(`  ✓ Ciclo creado: ${ciclo.nombre} (id: ${ciclo.id})`);

  // 2. Create Carrera with Materias
  const carrera = await prisma.carrera.create({
    data: {
      nombre: 'Desarrollo de Software',
      materias: {
        create: [
          { nombre: 'Programacion 1' },
          { nombre: 'Programacion 2' },
          { nombre: 'Base de Datos' },
        ],
      },
    },
    include: { materias: true },
  });
  console.log(`  ✓ Carrera creada: ${carrera.nombre} (id: ${carrera.id}) con ${carrera.materias.length} materias.`);

  // 3. Create Laboratorio
  const laboratorio = await prisma.laboratorio.create({
    data: { nombre: 'Laboratorio A-101' },
  });
  console.log(`  ✓ Laboratorio creado: ${laboratorio.nombre} (id: ${laboratorio.id})`);

  // 4. Create 2 Estudiantes
  const estudiante1 = await prisma.estudiante.create({
    data: { nombre: 'Juan Pérez', carreraId: carrera.id },
  });
  const estudiante2 = await prisma.estudiante.create({
    data: { nombre: 'María García', carreraId: carrera.id },
  });
  console.log(`  ✓ Estudiantes creados: ${estudiante1.nombre} (id: ${estudiante1.id}), ${estudiante2.nombre} (id: ${estudiante2.id})`);

  // 5. Create 2 active Matriculas
  const matricula1 = await prisma.matricula.create({
    data: {
      estudianteId: estudiante1.id,
      cicloId: ciclo.id,
      activo: true,
    },
  });
  const matricula2 = await prisma.matricula.create({
    data: {
      estudianteId: estudiante2.id,
      cicloId: ciclo.id,
      activo: true,
    },
  });
  console.log(`  ✓ Matrículas creadas: id ${matricula1.id} y id ${matricula2.id} (activas en ciclo ${ciclo.id})`);

  console.log('\n✅ Seed completado exitosamente.');
  console.log('\n📋 IDs para usar en Postman:');
  console.log(`   cicloId:       ${ciclo.id}`);
  console.log(`   carreraId:     ${carrera.id}`);
  console.log(`   laboratorioId: ${laboratorio.id}`);
  console.log(`   materiaId:     ${carrera.materias[0].id} (${carrera.materias[0].nombre})`);
}

main()
  .catch((e) => {
    console.error('✗ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

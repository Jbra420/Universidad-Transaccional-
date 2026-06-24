# Universidad API — Node.js + Prisma + PostgreSQL

API REST para el sistema universitario, construida con **Node.js**, **Express** y **Prisma ORM** sobre **PostgreSQL**.

---

## Requisitos

- Node.js v18+
- PostgreSQL corriendo localmente (o en Docker)
- npm

---

## Instalación

```bash
# 1. Clonar / abrir el proyecto
cd universidad

# 2. Instalar dependencias
npm install

# 3. Configurar la base de datos
# Editar .env con tus credenciales de PostgreSQL:
DATABASE_URL="postgresql://TU_USUARIO:TU_CONTRASEÑA@localhost:5432/universidad_db?schema=public"

# 4. Crear la base de datos en PostgreSQL
# Desde psql o pgAdmin, ejecutar:
# CREATE DATABASE universidad_db;

# 5. Ejecutar las migraciones (crea las tablas)
npx prisma migrate dev --name init

# 6. Generar el cliente Prisma
npx prisma generate

# 7. Poblar la base de datos con datos de prueba
npm run seed

# 8. Iniciar el servidor
npm start
# O en modo watch (auto-reload):
npm run dev
```

El servidor quedará en: `http://localhost:3000`

---

## Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor |
| `npm run dev` | Servidor con auto-reload |
| `npm run seed` | Carga datos de prueba |
| `npm run db:migrate` | Aplica migraciones |
| `npm run db:studio` | Abre Prisma Studio (GUI) |

---

## Estructura del proyecto

```
universidad/
├── prisma/
│   ├── schema.prisma       # Modelos de la BD
│   └── seed.js             # Datos de prueba
├── src/
│   ├── controllers/
│   │   ├── carrerasController.js
│   │   ├── matriculasController.js
│   │   └── laboratoriosController.js
│   ├── routes/
│   │   ├── carreras.js
│   │   ├── matriculas.js
│   │   └── laboratorios.js
│   ├── prismaClient.js     # Instancia singleton de Prisma
│   ├── app.js              # Configuración de Express
│   └── server.js           # Punto de entrada
├── .env                    # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## Endpoints y ejemplos Postman

> **Nota:** Después del seed, los IDs serán: `cicloId: 1`, `carreraId: 1`, `laboratorioId: 1`, `materiaId: 1`.

---

### 1. `POST /carreras` — Crear carrera con materias

Crea una carrera y sus materias en una sola transacción.

**URL:** `http://localhost:3000/carreras`  
**Method:** `POST`  
**Headers:** `Content-Type: application/json`

**Body (raw JSON):**
```json
{
  "carrera": "Desarrollo de Software",
  "materias": ["Programacion 1", "Programacion 2", "Base de Datos"]
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Carrera y materias creadas exitosamente.",
  "data": {
    "id": 1,
    "nombre": "Desarrollo de Software",
    "materias": [
      { "id": 1, "nombre": "Programacion 1", "carreraId": 1 },
      { "id": 2, "nombre": "Programacion 2", "carreraId": 1 },
      { "id": 3, "nombre": "Base de Datos",  "carreraId": 1 }
    ]
  }
}
```

**Errores (400):**
```json
{ "error": "Se requiere \"carrera\" (string) y \"materias\" (array no vacío)." }
```

---

### 2. `POST /matriculas/asignar-lugar` — Asignar lugar en laboratorio a estudiantes

Asigna un lugar de laboratorio a todos los estudiantes con matrícula activa en el ciclo y carrera especificados.

**URL:** `http://localhost:3000/matriculas/asignar-lugar`  
**Method:** `POST`  
**Headers:** `Content-Type: application/json`

**Body (raw JSON):**
```json
{
  "cicloId": 1,
  "carreraId": 1
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "2 asignación(es) de lugar creadas exitosamente.",
  "data": [
    {
      "id": 1,
      "matriculaId": 1,
      "laboratorioId": 1,
      "cicloId": 1,
      "matricula": {
        "id": 1,
        "activo": true,
        "estudiante": { "id": 1, "nombre": "Juan Pérez", "carreraId": 1 }
      },
      "laboratorio": { "id": 1, "nombre": "Laboratorio A-101" },
      "ciclo": { "id": 1, "nombre": "Ciclo 2025-I", "activo": true }
    },
    {
      "id": 2,
      "matriculaId": 2,
      "laboratorioId": 1,
      "cicloId": 1,
      "matricula": {
        "id": 2,
        "activo": true,
        "estudiante": { "id": 2, "nombre": "María García", "carreraId": 1 }
      },
      "laboratorio": { "id": 1, "nombre": "Laboratorio A-101" },
      "ciclo": { "id": 1, "nombre": "Ciclo 2025-I", "activo": true }
    }
  ]
}
```

**Errores (400) posibles:**
```json
{ "error": "El ciclo con id 99 no existe." }
{ "error": "El ciclo \"Ciclo 2025-I\" no está activo." }
{ "error": "La carrera con id 99 no existe." }
{ "error": "No existen estudiantes registrados para la carrera \"Desarrollo de Software\"." }
{ "error": "No existen matrículas activas en el ciclo \"Ciclo 2025-I\" para la carrera \"Desarrollo de Software\"." }
```

---

### 3. `POST /laboratorios/asignar` — Asignar laboratorio a una materia en un ciclo

Crea un registro de asignación de laboratorio para una materia en un ciclo activo.

**URL:** `http://localhost:3000/laboratorios/asignar`  
**Method:** `POST`  
**Headers:** `Content-Type: application/json`

**Body (raw JSON):**
```json
{
  "laboratorioId": 1,
  "cicloId": 1,
  "materiaId": 1
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Laboratorio asignado exitosamente.",
  "data": {
    "id": 1,
    "laboratorioId": 1,
    "cicloId": 1,
    "materiaId": 1,
    "laboratorio": { "id": 1, "nombre": "Laboratorio A-101" },
    "ciclo": { "id": 1, "nombre": "Ciclo 2025-I", "activo": true },
    "materia": {
      "id": 1,
      "nombre": "Programacion 1",
      "carreraId": 1,
      "carrera": { "id": 1, "nombre": "Desarrollo de Software" }
    }
  }
}
```

**Errores (400) posibles:**
```json
{ "error": "Se requieren \"laboratorioId\", \"cicloId\" y \"materiaId\"." }
{ "error": "El ciclo con id 99 no existe." }
{ "error": "El ciclo \"Ciclo 2025-I\" no está activo." }
{ "error": "No existen matrículas activas en el ciclo \"Ciclo 2025-I\"." }
{ "error": "La materia con id 99 no existe." }
{ "error": "El laboratorio con id 99 no existe." }
```

---

## Diagrama del Schema

```
Carrera ──< Materia
Carrera ──< Estudiante ──< Matricula
Ciclo   ──< Matricula
Matricula ──< AsignacionLugar >── Laboratorio
                                  Ciclo
Laboratorio ──< AsignacionLaboratorio >── Ciclo
                                          Materia
```

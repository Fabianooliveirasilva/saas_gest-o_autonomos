# FacturaFácil

Plataforma SaaS para autónomos en España enfocada en:

- Facturación con cálculo automático de IVA/IRPF
- Gestión de gastos
- Panel financiero con métricas y gráficos
- Resumen fiscal mensual
- Generación de PDF para facturas

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Prisma + PostgreSQL
- Auth.js (NextAuth)
- Recharts
- pdf-lib

## Funcionalidades MVP

- Autenticación (registro + login)
- Rutas protegidas de dashboard
- Panel con ingresos, gastos, beneficio neto y gráfica mensual
- Módulo de facturas con descarga PDF
- Módulo de gastos con categorización automática simple (IA mock)
- Módulo de impuestos con cálculo de IVA e IRPF
- Recordatorios fiscales
- Planes de suscripción (mock Stripe)

## Estructura

- src/app
- src/components
- src/lib
- src/services
- src/hooks
- src/types

## Puesta en marcha

1. Instalar dependencias

```bash
npm install
```

2. Configurar variables de entorno

```bash
cp .env.example .env
```

3. Configurar tu PostgreSQL en DATABASE_URL y ejecutar migraciones

```bash
npm run prisma:migrate -- --name init
npm run prisma:generate
```

4. Iniciar en desarrollo

```bash
npm run dev
```

5. Build de producción

```bash
npm run build
npm start
```

## Deploy

Listo para desplegar en Vercel. Asegura estas variables en entorno de producción:

- DATABASE_URL
- AUTH_SECRET
- NEXTAUTH_URL

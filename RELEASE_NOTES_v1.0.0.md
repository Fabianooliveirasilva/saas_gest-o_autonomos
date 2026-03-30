# v1.0.0 - FacturaFacil MVP

## Features

- SaaS MVP completo para autonomos na Espanha
- Autenticacao com Auth.js (registro e login)
- Painel financeiro com metricas e grafico mensal
- Gestao de facturas com calculo automatico de IVA/IRPF
- Geracao de PDF para facturas
- Gestao de gastos com categorizacao automatica simples
- Modulo de impostos com resumo fiscal
- Recordatorios fiscais e mock de planos de assinatura

## Hardening e Qualidade

- Migracao de valores monetarios para Decimal
- Numeracao sequencial de facturas por usuario
- Rate limiting nas APIs criticas
- Headers de seguranca HTTP no Next.js
- Validacao de AUTH_SECRET forte em producao
- CI com GitHub Actions (lint + build)

## Infra e Banco

- Prisma + PostgreSQL remoto (Prisma Postgres)
- Seed de dados demo para onboarding rapido

## Deploy

Variaveis obrigatorias:

- DATABASE_URL
- AUTH_SECRET
- NEXTAUTH_URL

Passos basicos:

1. npm ci
2. npm run prisma:generate
3. npm run build
4. npm start

## Credenciais demo

- Email: demo@facturafacil.es
- Password: Demo1234!

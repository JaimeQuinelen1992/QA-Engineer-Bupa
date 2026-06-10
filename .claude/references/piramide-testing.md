# Pirámide de Testing — BUPA Chile

| Campo | Detalle |
|-------|---------|
| **Autor** | Jaime Quiñelen Villar — QA Lead |
| **Organización** | BUPA Chile |
| **Modelo** | Pirámide de Testing — Mike Cohn |
| **Versión** | v1.0 |
| **Fecha** | Mayo 2026 |

---

## Descripción

Distribución de los 11 tipos de prueba en los 4 niveles de la pirámide. La base sostiene la velocidad y el costo bajo; la cima aporta la validación humana que ninguna herramienta reemplaza.

> **Regla principal:** Mientras más arriba en la pirámide, más caro, más lento y menos casos se justifican.

---

## Estructura de la Pirámide

```
                        ▲
                       /|\
                      / | \         LENTO · CARO · POCOS CASOS
                     /  |  \
                    /  CIMA  \
                   /          \
                  / Manual     \
                 / Exploratory  \    [ UAT ]
                / Usability      \
               /------------------\
              /                    \
             /       E2E / UI       \   10%
            /  Regression            \
           /  Accessibility · Smoke   \  [ UAT · PROD ]
          /  Security                  \
         /------------------------------\
        /                               \
       /     INTEGRACIÓN / SERVICE       \   20%
      /  Integration · Performance        \
     /  Security (API · auth · TLS)        \  [ DEV · UAT · PROD ]
    /------------------------------------------\
   /                                            \
  /              BASE — 70%                      \
 /  Unit Testing ·                                 \ 
/  Go test · Jest · Karma                           \  [ DEV]
/____________________________________________________\

                  RÁPIDO · BARATO · MUCHOS CASOS
```

---

## Niveles de la Pirámide

### CIMA — Criterio Humano
> Sin herramienta fija · Observación directa

| Campo | Detalle |
|-------|---------|
| **% del esfuerzo** | Mínimo |
| **Tipos de prueba** | Manual · Exploratory · Usability |
| **Automatización** | No automatizable |
| **Ambientes** | `UAT` |
| **Responsable** | QA Lead |
| **Característica** | Requiere criterio humano — no reemplazable por herramientas |

---

### E2E / UI — 10%
> Playwright · Cypress · Appium · Selenium · BrowserStack

| Campo | Detalle |
|-------|---------|
| **% del esfuerzo** | 10% |
| **Tipos de prueba** | Regression · Accessibility · Security · Smoke |
| **Automatización** | Semi-automatizado |
| **Ambientes** | `UAT` · `PROD` |
| **Responsable** | QA Lead |
| **Característica** | Flujos completos de usuario en navegador real |

---

### INTEGRACIÓN / SERVICE — 20%
> Postman · Newman · n8n · APIs REST · Contratos SDD

| Campo | Detalle |
|-------|---------|
| **% del esfuerzo** | 20% |
| **Tipos de prueba** | Integration · Performance · Security (API · auth · TLS) |
| **Automatización** | Automatizable (parcial) |
| **Ambientes** | `DEV` · `UAT` · `PROD` |
| **Responsable** | QA Lead + DevOps |
| **Característica** | Valida contratos entre servicios y APIs |

---

### BASE — 70%
> Go test · Jest · Karma · Azure DevOps CI

| Campo | Detalle |
|-------|---------|
| **% del esfuerzo** | 70% |
| **Tipos de prueba** | Unit Testing |
| **Ambientes** | `DEV` |
| **Automatización** | 100% automatizado |
| **Responsable** | Dev Team (Unit) · QA Lead + Dev (Automated) |
| **Característica** | Cobertura mínima exigida: **≥ 80%** |

---

## Métricas por Nivel

| Nivel | % Esfuerzo | Herramientas | Cobertura mínima |
|-------|:----------:|--------------|:----------------:|
| Base — Unitarias | **70%** | Go test · Jest · Karma · Azure DevOps CI | ≥ 80% |
| Integración / Service | **20%** | Postman · Newman · n8n · APIs REST | — |
| E2E / UI | **10%** | Playwright · Cypress · Appium · Selenium · BrowserStack | — |
| Tipos cubiertos | **11** | — | — |

---

## Mapa Completo — 11 Tipos de Pruebas en la Pirámide

| Tipo de Prueba | Qué valida | Ambiente | Nivel Pirámide | Categoría |
|---|---|---|---|---|
| **Unit Testing** | Funciones/clases aisladas — backend (Go) y frontend (Angular) | DEV | Base / Unitarias (70%) | Frontend + Backend |
| **Smoke Testing** | Flujos críticos básicos funcionan tras un deploy | UAT · PROD | E2E / UI (10%) | UX / UI |
| **Integration Testing** | Comunicación entre módulos, APIs, BD y workflows | DEV · UAT · PROD | Integración (20%) | Backend |
| **Performance Testing** | Tiempos de respuesta, carga y estrés del sistema | UAT | Integración (20%) — soporte | Backend |
| **Regression Testing** | Que cambios nuevos no rompan funcionalidad existente | UAT · PROD | E2E / UI (10%) | UX / UI |
| **Accessibility Testing** | Cumplimiento WCAG — lectores de pantalla, contraste, navegación teclado | UAT | E2E / UI (10%) | UX / UI |
| **Automated Testing** | Ejecución automática de casos en cualquier nivel | UAT · PROD | Base + E2E (transversal) | Frontend + Backend |
| **Security Testing** | Vulnerabilidades — auth, TLS, XSS, CSRF, OWASP | DEV · UAT · PROD | Integración (20%) + E2E (10%) | Backend |
| **Manual Testing** | Validación humana de flujos sin script automatizado | UAT · PROD | Cima — Criterio Humano | UX / UI |
| **Exploratory Testing** | Búsqueda libre de defectos sin casos predefinidos | UAT | Cima — Criterio Humano | UX / UI |
| **Usability Testing** | Facilidad de uso percibida por usuarios reales | UAT | Cima — Criterio Humano | UX |

---

## Distribución por Volumen de Casos

Los porcentajes de la pirámide (70 / 20 / 10) no son sobre una cantidad fija de casos de prueba: representan **esfuerzo, volumen relativo y tiempo de ejecución**.

> **Regla:** A mayor número de casos totales por requerimiento, más se nota el impacto de esta distribución en la planificación del sprint.

### Fórmula de Distribución

Dado un total **N** de casos de prueba para un requerimiento:

| Nivel | % | Fórmula | Descripción |
|-------|:-:|---------|-------------|
| **Unitarias (Base)** | 70% | `N × 0.70` | Funciones o clases aisladas — rápidas, baratas, alta cobertura |
| **Integración (Service)** | 20% | `N × 0.20` | Comunicación entre módulos, APIs y bases de datos |
| **E2E (Cima UI)** | 10% | `N × 0.10` | Flujos críticos del usuario final — lentas y costosas |

### Ejemplo de Aplicación

Para un requerimiento con **100 casos de prueba**:

| Nivel | Casos estimados | Herramienta referencial |
|-------|:--------------:|------------------------|
| Unitarias (70%) | ~70 | Jest · Go test · Karma |
| Integración (20%) | ~20 | Postman · Newman · n8n |
| E2E (10%) | ~10 | Cypress · Playwright |
| **Total** | **~100** | |

> **Nota de aplicación:** Los valores son estimaciones redondeadas. El decimal se asigna al nivel que más beneficio aporta al riesgo del requerimiento específico.

---

## Eje de la Pirámide

| Atributo | Cima | E2E | Service | Base |
|----------|:----:|:---:|:-------:|:----:|
| Velocidad | Lento | Medio | Medio | Rápido |
| Costo | Alto | Medio-Alto | Medio | Bajo |
| Cantidad de casos | Pocos | Moderado | Moderado | Muchos |
| Automatización | No | Parcial | Parcial-Total | Total |
| Feedback | Tardío | Tardío | Rápido | Inmediato |

---

## Stack Tecnológico

`Cypress` · `Playwright` · `Postman` · `Newman` · `n8n` · `Go test` · `Jest` · `Karma` · `BrowserStack` · `GitHub Actions` · `Lighthouse` · `k6` · `cypress-axe` · `OWASP ZAP`

---

## Conceptos Base — UX, UI, Frontend, Backend

| Concepto | Definición | Qué prueba QA |
|----------|-----------|----------------|
| **UX (User Experience)** | Experiencia general del usuario — qué tan fácil, lógico e intuitivo es usar la app | Flujos completos (Cypress/Playwright E2E) |
| **UI (User Interface)** | La parte visual — botones, colores, tipografías, formularios | Apariencia y comportamiento visual (E2E + Accessibility) |
| **Frontend** | Código que corre en el navegador/app del usuario (Angular en BUPA) | Jest/Karma (unitarias), Cypress/Playwright (E2E) |
| **Backend** | Código que corre en el servidor — lógica de negocio, BD, APIs (Go en BUPA) | Go test (unitarias), Postman/Newman (integración) |

> **BDD (Behavior Driven Development)** no es un nivel de la pirámide — es un enfoque aplicable en Integración (contratos de API en lenguaje de negocio) y E2E/UI (escenarios Gherkin `Given/When/Then`).

---

## Mapeo de Herramientas — Ambiente, Pirámide y Capa

| Herramienta | Qué hace | Ambiente | Nivel Pirámide | Categoría | Tipo de Prueba |
|---|---|---|---|---|---|
| **Cypress E2E** | Automatiza pruebas end-to-end en navegador, simulando al usuario | UAT · PROD (smoke) | E2E / UI (10%) | UX / UI | Smoke · Regression · Accessibility · Automated |
| **Playwright E2E** | Igual que Cypress, multi-navegador y emulación mobile | UAT · PROD (smoke) | E2E / UI (10%) | UX / UI | Smoke · Regression · Accessibility · Automated |
| **n8n** | Automatización de workflows — conecta GitHub, Gmail, Jira sin código | DEV · UAT | Integración (20%) — soporte/orquestación | Backend | Integration · Automated |
| **Jira** | Gestión de tickets, bugs, historias y trazabilidad de sprints | Todos (gestión) | Transversal — no técnico | — | Manual (trazabilidad) |
| **SDD** | Las especificaciones funcionales son la fuente de verdad de los tests | Todos | Transversal — define qué se prueba en cada nivel | — | — |
| **GitHub / GitHub Actions CI/CD** | Versionado + pipelines automáticos (lint, build, test) | DEV · UAT | Transversal — ejecuta todos los niveles automatizados | Frontend + Backend | Automated |
| **Claude IA** | Apoyo para generar casos, detectar bugs, refactor, análisis de logs | Todos | Transversal — apoyo en todos los niveles | — | — |
| **Agile/Scrum** | Metodología de trabajo — sprints, dailies, retros, DoD | Todos (gestión) | Transversal — marco de trabajo | — | — |
| **Postman/Newman** | Probar APIs manual (Postman) y en CLI/CI (Newman) | DEV · UAT · PROD | Integración (20%) | Backend | Integration · Security · Automated |
| **Jest** | Testing unitario para JS/Angular | DEV | Base / Unitarias (70%) | Frontend | Unit · Automated |
| **Go test** | Testing unitario nativo de Go | DEV | Base / Unitarias (70%) | Backend | Unit · Automated |
| **Azure DevOps** | Gestión de proyectos + pipelines CI/CD + Test Plans | DEV · UAT · PROD | Transversal — gestión y CI/CD | Frontend + Backend | Automated · Manual |
| **BrowserStack** | E2E en dispositivos/navegadores reales en la nube | UAT | E2E / UI (10%) | UX / UI | Regression · Accessibility |
| **Appium/Selenium** | E2E para apps móviles nativas y navegadores | UAT | E2E / UI (10%) | UX / UI | Smoke · Regression · Automated |
| **Datadog** | Observabilidad y monitoreo en producción | PROD | Post-pirámide — monitoreo continuo | Backend | Performance |
| **Docker/Kubernetes** | Contenedores y orquestación de ambientes | DEV · UAT · PROD | Soporte de infraestructura | Backend | — |
| **Capacitor (mobile)** | Convierte apps Angular en apps nativas iOS/Android | DEV · UAT | E2E / UI (10%) — mobile | Frontend | Smoke · Regression |
| **TestRail / Azure Test Plans** | Documentación y trazabilidad de casos de prueba | UAT | Transversal — documentación de casos | — | Manual · Exploratory · Usability |
| **Base de Datos** | Validación de integridad, consultas y migraciones | DEV · UAT | Integración (20%) | Backend | Integration |

> *Transversal* = soporte/gestión a todos los niveles, no es un nivel propio. *Post-pirámide* = ocurre después del testing, en producción. "—" = herramienta de gestión/metodología, no aplica a una capa técnica específica.

---

## Referencias

- Documento visual: `estandarizacion/piramide-testing.html`
- Presentación: `estandarizacion/piramide-testing.pptx`



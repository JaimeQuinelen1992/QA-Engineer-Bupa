/// <reference types="cypress" />

// REQ-XXX — Login y validacion de pantalla "Inicio" - Portal Paciente Bupa
// Spec: PortalPaciente-Login_Inicio.cy.js
// Criterios automatizados: TC-001 a TC-009
// URL bajo prueba: https://portalpaciente.bupa.cl/inicio
//
// Ambiente: PRODUCCION (smoke test de solo lectura)
// Ejecutar con: npm run test:prod -- --spec "cypress/e2e/PortalPaciente-Login_Inicio.cy.js"
//
// Credenciales: cy.loginBupa() lee desde cypress/fixtures/auth/credenciales-validas.json
// Ese archivo esta en .gitignore y NO se commitea (RUT/clave reales del usuario de prueba).
//
// Nota de selectores: no se cuenta con los atributos data-testid del Portal Pacientes,
// por lo que se usa cy.contains() sobre textos visibles. Reemplazar por
// [data-testid="..."] cuando el equipo de desarrollo confirme los IDs (ver
// convencion en CLAUDE.md).
//
// Nota de contenido: algunos textos validados aqui replican errores ortograficos
// ya documentados en .claude/project/hallazgos-portal-paciente.md (BUG-005).
// Si esos bugs se corrigen, actualizar el texto esperado en TC-008.

describe('REQ-XXX | Login y pantalla Inicio - Portal Paciente', () => {

  beforeEach(() => {
    // DADO que el usuario no tiene sesion activa
    // CUANDO visita el portal e ingresa RUT y clave validos (cy.loginBupa)
    // ENTONCES debe quedar autenticado y redirigido a /inicio antes de cada caso
    cy.visitPortal()
    cy.loginBupa()
    cy.url().should('include', '/inicio')
  })

  // TC-001 — Login exitoso muestra el nombre del usuario y la opcion de cerrar sesion
  it('TC-001 | Login exitoso muestra el nombre del usuario en el header', () => {
    cy.contains('Jaime').should('be.visible')
    cy.contains('Cerrar sesión').should('be.visible')
  })

  // TC-002 — El header del portal con el logo/nombre de la app es visible
  it('TC-002 | Header "Mi Portal Bupa" es visible', () => {
    cy.contains('Mi Portal Bupa').should('be.visible')
  })

  // TC-003 — Saludo personalizado de la pantalla Inicio
  it('TC-003 | Pantalla Inicio muestra el saludo "¡Hola Jaime!"', () => {
    cy.contains('¡Hola Jaime!').should('be.visible')
  })

  // TC-004 — El menu lateral contiene todas las opciones de navegacion esperadas
  it('TC-004 | Menu lateral muestra todas las opciones de navegacion', () => {
    const opciones = [
      'Inicio',
      'Mis citas',
      'Historial de atenciones',
      'Mis exámenes',
      'Mi familia',
      'Planes y Beneficios',
      'Mi perfil',
      'Centro de ayuda',
    ]

    opciones.forEach((opcion) => {
      cy.contains(opcion).should('be.visible')
    })
  })

  // TC-005 — Pregunta y las 4 tarjetas de tipo de atencion
  it('TC-005 | Seccion "Que tipo de atencion necesitas" muestra sus 4 tarjetas', () => {
    cy.contains('¿Qué tipo de atención necesitas?').should('be.visible')

    const tarjetas = ['Telemedicina', 'Consulta Médica', 'Consulta Dental', 'Exámenes']

    tarjetas.forEach((tarjeta) => {
      cy.contains(tarjeta).should('be.visible')
    })
  })

  // TC-006 — Cada tarjeta de tipo de atencion redirige al flujo de agendamiento
  it('TC-006 | Tarjeta "Consulta Médica" redirige al flujo de agendamiento', () => {
    cy.contains('Consulta Médica').click()
    cy.url().should('include', '/agenda')
  })

  // TC-007 — Seccion "Accesos rapidos" con sus 3 tarjetas y descripciones
  it('TC-007 | Seccion "Accesos rapidos" muestra sus 3 tarjetas con descripcion', () => {
    cy.contains('Accesos rápidos').should('be.visible')

    cy.contains('Próximas citas').should('be.visible')
    cy.contains('Revisa el detalle de tus reservas').should('be.visible')

    cy.contains('Mis exámenes').should('be.visible')
    cy.contains('Conoce el resultado de tus exámenes').should('be.visible')

    cy.contains('Historial de citas').should('be.visible')
    cy.contains('Accede a tus Recetas, Ordenes Clínicas y más').should('be.visible')
  })

  // TC-008 — Banner promocional de cotizacion de cirugia (Blua)
  // El texto "Cirugia" sin tilde replica el error ortografico BUG-005
  it('TC-008 | Banner de cotizacion de cirugia es visible con su boton', () => {
    cy.contains('Necesitas Cotizar tu Cirugia').should('be.visible')
    cy.contains('Te ayudamos a tomar la mejor decisión').should('be.visible')
    cy.contains('Solicítalo aquí').should('be.visible')
  })

  // TC-009 — Cerrar sesion finaliza la sesion y saca al usuario de /inicio
  it('TC-009 | Cerrar sesion redirige fuera de la pantalla Inicio', () => {
    cy.contains('Cerrar sesión').click()
    cy.url().should('not.include', '/inicio')
  })

})

# Hallazgos QA — Portal Paciente Bupa

| Campo | Detalle |
|-------|---------|
| **Autor** | Jaime Quiñelen Villar — QA Lead |
| **Ambiente** | Producción (`portalpaciente.bupa.cl`) |
| **Fecha inicio** | 09-06-2026 |

---

## Resumen

| # | Fecha | Módulo | Título | Tipo | Severidad | Estado |
|---|---|---|---|---|---|---|
| 1 | 09-06-2026 | Mi Perfil | Campo "Calle y número" muestra "undefined" al editar dirección | Bug | Crítica | Por reportar en Jira |
| 2 | 09-06-2026 | Mi Perfil | Previsión muestra Isapre incorrecta | Bug | Alta | Por reportar |
| 3 | 10-06-2026 | Mi Familia | No se puede cargar documento del Registro Civil | Bug | Crítica | Por reportar |
| 4 | 10-06-2026 | Mi Familia | Falta validación de RUT de menor de edad | Mejora | Baja | Por reportar |
| 5 | 10-06-2026 | Inicio / Mis Exámenes | Errores ortográficos (Cirugia, tiene/tienen, tí) | Bug | Baja | Por reportar |

---

## BUG-001 — Al editar "Dirección de contacto" los campos se borran y "Calle y número" muestra "undefined"

**Severidad:** Critica
**Prioridad:** P1
**Ambiente:** Producción
**Fecha:** 09-06-2026

### Descripcion
Al hacer clic en el ícono de edición de "Dirección de contacto" en Mi Perfil, los campos Región y Comuna pierden el valor guardado (vuelven al placeholder) y el campo "Calle y número" muestra el texto literal "undefined" en vez del valor real.

### Pasos para Reproducir
1. Iniciar sesión en `portalpaciente.bupa.cl/perfil`
2. Ir a "Mi perfil" → "Datos de contacto"
3. Verificar que "Dirección de contacto" muestra: Región "RM - Santiago", Comuna "Lampa", Calle y número "papudo 885"
4. Hacer clic en el ícono de edición (lápiz) junto a "Dirección de contacto"

### Resultado Actual
- Región y Comuna vuelven al placeholder vacío
- "Calle y número" muestra el texto literal "undefined"
- Los 3 campos quedan marcados como "Este campo es requerido"
- Los botones "Borrar" y "Guardar cambios" quedan deshabilitados

### Resultado Esperado
- Al editar, los campos deben mantener los valores guardados y permitir modificarlos
- Nunca debe mostrarse el texto "undefined"
- "Guardar cambios" debe estar habilitado

### Evidencia
- Screenshot: estado antes de editar (datos correctos) y después de editar (undefined + errores)

### Contexto Tecnico
- Usuario de prueba: RUT 18116826-9
- Datos relevantes: Región "RM - Santiago", Comuna "Lampa", Calle y número "papudo 885"

---

## BUG-002 — Campo "Previsión" muestra Isapre incorrecta

**Severidad:** Alta
**Prioridad:** P2
**Ambiente:** Producción
**Fecha:** 09-06-2026

### Descripcion
En Mi Perfil → "Otros datos", el campo "Previsión" muestra "Isapre Colmena", no correspondiendo a la previsión real del usuario. El dato probablemente proviene de una integración con el sistema core de afiliación y no está validando correctamente al usuario autenticado.

### Pasos para Reproducir
1. Iniciar sesión en `portalpaciente.bupa.cl/perfil`
2. Ir a "Mi perfil" → expandir "Otros datos"
3. Revisar el valor del campo "Previsión"

### Resultado Actual
El campo "Previsión" muestra "Isapre Colmena", que no corresponde a la previsión real del usuario logueado.

### Resultado Esperado
El campo "Previsión" debe reflejar la previsión real asociada al RUT del usuario autenticado, según el sistema core de afiliación.

### Evidencia
- Screenshot: sección "Otros datos" con campo Previsión

### Contexto Tecnico
- Posible causa: falla en la integración/API de previsión, o validación de identidad del usuario vs. dato retornado
- Riesgo asociado: posible cruce de datos entre usuarios (revisar como tema de seguridad/integridad de datos)

---

## BUG-003 — No se puede cargar documento válido del Registro Civil al agregar carga

**Severidad:** Critica
**Prioridad:** P1
**Ambiente:** Producción
**Fecha:** 10-06-2026

### Descripcion
Al intentar agregar a un hijo/a como carga familiar, el sistema no acepta un documento válido del Registro Civil (certificado de nacimiento), impidiendo completar el proceso.

### Pasos para Reproducir
1. Iniciar sesión en `portalpaciente.bupa.cl`
2. Ir a "Mi familia" → "Agregar carga"
3. Completar datos del hijo/a y llegar al paso de adjuntar documento del Registro Civil
4. Adjuntar un documento válido (ej. certificado de nacimiento en PDF)
5. Intentar continuar/guardar

### Resultado Actual
El sistema no acepta el documento adjunto y no permite avanzar en el proceso de agregar la carga.

### Resultado Esperado
El sistema debe aceptar el documento válido del Registro Civil y permitir completar el registro del hijo/a como carga.

### Evidencia
- Pendiente: mensaje de error exacto, formato/peso del archivo usado, captura del error

### Contexto Tecnico
- Pendiente confirmar: formato de archivo (PDF/JPG/PNG), peso, y en qué paso ocurre el bloqueo (selección, subida o guardado)

---

## MEJORA-004 — Falta validación de edad en el campo RUT del menor

**Severidad:** Baja (Usabilidad)
**Prioridad:** P4
**Ambiente:** Producción
**Fecha:** 10-06-2026

### Descripcion
El campo "RUT del menor" en "Agregar carga" no valida que el RUT ingresado corresponda a una persona menor de edad, permitiendo ingresar el RUT de una persona mayor de edad sin alertar al usuario.

### Pasos para Reproducir
1. Ir a "Mi familia" → "Agregar carga"
2. Ingresar el RUT de una persona mayor de edad en el campo "RUT del menor"
3. Presionar "Continuar"

### Resultado Actual
El sistema permite avanzar sin validar la edad asociada al RUT ingresado.

### Resultado Esperado
Al presionar "Continuar", el sistema debe validar la edad del RUT ingresado y, si corresponde a un mayor de edad, mostrar una alerta e impedir avanzar.

### Evidencia
- Pendiente

### Contexto Tecnico
- Tipo de prueba: Validación de campos / Reglas de negocio (Functional Testing)

---

## BUG-005 — Errores ortográficos y de concordancia en textos estáticos

**Severidad:** Baja
**Prioridad:** P4
**Ambiente:** Producción
**Fecha:** 10-06-2026

### Descripcion
Se detectaron errores ortográficos y de concordancia en textos visibles del portal.

### Pasos para Reproducir
1. Ir a "Inicio" → revisar banner "¿Necesitas Cotizar tu Cirugia?"
2. Ir a "Mis exámenes" → revisar sección "¿No encuentras tus exámenes?" y banner Blua

### Resultado Actual
| Ubicación | Texto actual | Texto correcto |
|---|---|---|
| Inicio — banner cotización cirugía | "¿Necesitas Cotizar tu Cirugia?" | "¿Necesitas Cotizar tu Cirugía?" |
| Mis exámenes — "¿No encuentras tus exámenes?" | "Algunos exámenes tiene características particulares" | "Algunos exámenes tienen características particulares" |
| Mis exámenes — banner Blua | "Protégete a tí y a tu familia" | "Protégete a ti y a tu familia" |

### Resultado Esperado
Corregir los textos según ortografía y gramática estándar del español.

### Evidencia
- Screenshots de "Inicio" y "Mis exámenes"

### Contexto Tecnico
- Tipo de prueba: Validación de contenido / Textos estáticos
- Impacto: no funcional, afecta percepción de calidad de la plataforma

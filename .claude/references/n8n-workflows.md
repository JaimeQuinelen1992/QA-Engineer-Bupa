# n8n Workflows — Guia de Referencia QA

## Setup n8n en Mac (instalación local)

**Requisitos:** Node v18+ / npm

```bash
# Corregir permisos antes de instalar
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/share

# Instalar n8n globalmente
npm install -g n8n

# Iniciar n8n
n8n start
```

Acceder en: `http://localhost:5678`

Para guardar datos dentro del proyecto:
```bash
export N8N_USER_FOLDER=/Users/jaimequinelen/Projects/QA-Engineer-Bupa/n8n
n8n start
```

---

## Conexión GitHub con n8n

### Crear token de GitHub
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generar token con permiso `repo`
3. Copiar el token (se muestra solo una vez)

### Agregar credencial en n8n
1. Abrir nodo GitHub → "Set up credential"
2. Seleccionar **GitHub API**
3. Pegar el token
4. Guardar y asignar a todos los nodos GitHub del workflow

> Cuenta GitHub creada con correo corporativo `jaime.quinelen@bupa.cl`

---

## Workflows creados

### WF Respaldo Automático de Workflows en GitHub
- **Archivo:** (importado desde template)
- **Trigger:** Diario a las 12:00 AM
- **Función:** Respalda todos los workflows de n8n en un repositorio de GitHub
- **Estado:** Funcionando

### WF1 Definir Datos Reportes
- **Archivo:** `n8n/WF1-definir-datos-reportes.json`
- **Trigger:** Manual
- **Función:** Define datos base de un reporte QA (proyecto, ambiente, fecha, sprint, correo destino) y sube el archivo JSON a GitHub en `reportes/`
- **Estado:** Creado — pendiente ejecutar

---

## Outlook Corporativo (@bupa.cl)

Conectar Outlook corporativo a n8n requiere **Azure AD app registration** con permisos de administrador del tenant de Microsoft 365 de Bupa (área de IT). No es posible con permisos locales de Mac.

**Alternativa actual:** workflows sin email hasta obtener acceso con IT.

---

## Convención de nombres

Los workflows siguen el patrón `WF-X.Y-descripcion.json`:
- `X` = módulo
- `Y` = sub-workflow
- Archivos versionados en `n8n/` del repositorio

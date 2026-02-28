# Portfolio Profesional — Full Stack Developer

Portafolio web profesional construido con Next.js 14, Tailwind CSS, Three.js, PostgreSQL, Prisma y Resend. Listo para deploy en Dokploy con Docker Compose.

---

## Tabla de Contenidos

1. [Personalización](#1-personalización)
2. [Deploy en Dokploy](#2-deploy-en-dokploy)
3. [Desarrollo Local](#3-desarrollo-local)
4. [Troubleshooting](#4-troubleshooting)
5. [Checklist de Deploy](#5-checklist-de-deploy)

---

## 1. Personalización

### Archivos a editar (en este orden):

#### 1.1. `/lib/content.ts` — Todo el contenido del sitio
Este es el archivo central. Aquí cambias:
- **PERSONAL**: nombre, título, tagline, ubicación, email, redes sociales
- **SEO**: título de la página, descripción, keywords
- **HERO**: headline, subtítulo y textos de los botones CTA
- **SERVICES_DATA**: títulos, descripciones y CTAs de cada servicio
- **STACK_DATA**: tecnologías y sus justificaciones
- **CONTACT**: textos del formulario de contacto

#### 1.2. `/public/og-image.png` — Imagen Open Graph
- **Dimensiones**: 1200 x 630 px
- **Formato**: PNG
- **Propósito**: previsualización en redes sociales cuando compartan tu link
- Reemplaza el placeholder incluido con tu diseño personalizado

#### 1.3. `/public/images/` — Imágenes adicionales
Consulta el `README.md` dentro de esa carpeta para detalles de dimensiones y formatos.

#### 1.4. `.env` — Variables de entorno
Copia `.env.example` y configura tus valores reales (ver sección de variables abajo).

---

## 2. Deploy en Dokploy

### Paso 1: Preparar el repositorio
1. Haz fork o clona este repositorio
2. Edita `/lib/content.ts` con tus datos personales
3. Reemplaza `/public/og-image.png` con tu imagen
4. Haz commit y push a tu repositorio Git

### Paso 2: Crear proyecto en Dokploy
1. Accede a tu panel de Dokploy
2. Crea un nuevo proyecto
3. Selecciona tipo **"Docker Compose"**
4. Conecta tu repositorio Git (GitHub, GitLab, etc.)

### Paso 3: Configurar variables de entorno
En el panel de Dokploy > **Environment**, agrega estas variables:

```env
# Base de datos
DATABASE_URL=postgresql://portfolio_user:TU_PASSWORD_SEGURA@db:5432/portfolio_db
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=TU_PASSWORD_SEGURA
POSTGRES_DB=portfolio_db

# Resend (email)
RESEND_API_KEY=re_tu_api_key_real
CONTACT_EMAIL_TO=tu@email.com
CONTACT_EMAIL_FROM=contacto@tudominio.com

# Sitio
NEXT_PUBLIC_SITE_URL=https://tudominio.com

# Entorno
NODE_ENV=production
```

> **IMPORTANTE**: Genera una contraseña segura para `POSTGRES_PASSWORD`. Nunca uses la del ejemplo.

### Paso 4: Primer deploy
1. Haz clic en **Deploy** en Dokploy
2. El build de Docker se ejecutará automáticamente
3. Las migraciones de Prisma corren al iniciar el contenedor (`prisma migrate deploy`)
4. La base de datos se crea automáticamente gracias al healthcheck de PostgreSQL

### Paso 5: Configurar dominio y SSL
1. En Dokploy > **Domains**, agrega tu dominio
2. Apunta el DNS de tu dominio al servidor de Dokploy (A record)
3. Activa SSL/TLS (Dokploy genera certificados Let's Encrypt automáticamente)
4. Verifica que `NEXT_PUBLIC_SITE_URL` coincida con tu dominio configurado

---

## 3. Desarrollo Local

### Requisitos previos
- Node.js 20+
- Docker y Docker Compose
- npm

### Setup

```bash
# 1. Clona el repositorio
git clone <tu-repo-url>
cd portfolio

# 2. Copia las variables de entorno
cp .env.example .env.local

# 3. Edita .env.local con tus valores de desarrollo
# Para desarrollo local, el DATABASE_URL usa localhost:
# DATABASE_URL="postgresql://portfolio_user:cambia_esto_en_produccion@localhost:5432/portfolio_db"

# 4. Levanta la base de datos con Docker
docker compose up db -d

# 5. Instala dependencias
npm install

# 6. Genera el cliente de Prisma y ejecuta migraciones
npx prisma generate
npx prisma migrate dev

# 7. Inicia el servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.

### Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm run start` | Iniciar build de producción |
| `npx prisma studio` | Interfaz visual para ver/editar datos en la DB |
| `npx prisma migrate dev` | Crear y aplicar migraciones en desarrollo |
| `npx prisma migrate deploy` | Aplicar migraciones en producción |
| `docker compose up` | Levantar toda la infraestructura (app + DB) |
| `docker compose up db -d` | Solo levantar la DB en background |

### Modo local (override para publicar puerto)

Para desarrollo local y exponer la app en `http://localhost:3000` usa el archivo override que publica el puerto del host. Esto no se usa en producción.

```bash
# copia las variables de ejemplo (si no lo hiciste)
cp .env.example .env.local
# (opcional) edita .env.local para ajustar HOST_PORT
# Arrancar (usa override que publica el puerto):
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

En producción (Dokploy) `docker-compose.yml` NO publica puertos en el host para evitar conflictos de bind; la plataforma debe encaminar el tráfico externo al contenedor.

---

## 4. Troubleshooting

### Error: "Database connection refused"
**Causa**: La base de datos no está lista cuando la app intenta conectar.
**Solución**: El `docker-compose.yml` incluye `depends_on` con `condition: service_healthy`. Si persiste, verifica que las variables `POSTGRES_*` coincidan con el `DATABASE_URL`.

### Error: "prisma migrate deploy failed"
**Causa**: La carpeta de migraciones no existe o el schema cambió.
**Solución**: 
1. En desarrollo: ejecuta `npx prisma migrate dev` para generar migraciones
2. Verifica que la carpeta `prisma/migrations/` exista y tenga contenido
3. Haz commit de las migraciones al repositorio

### Error: "Cannot find module '@prisma/client'"
**Causa**: El cliente de Prisma no se generó durante el build.
**Solución**: El `Dockerfile` ejecuta `prisma generate` en los stages de deps y builder. Si el error persiste, verifica que `prisma` esté en `devDependencies` y `@prisma/client` en `dependencies`.

### Error: "Resend API key invalid"
**Causa**: La API key de Resend no es válida o no está configurada.
**Solución**: 
1. Verifica que `RESEND_API_KEY` empiece con `re_`
2. Revisa en [resend.com/api-keys](https://resend.com/api-keys) que la key esté activa
3. El formulario guardará el mensaje en la DB aunque el email falle

### Error: "Email from address not verified"
**Causa**: El email en `CONTACT_EMAIL_FROM` no tiene el dominio verificado en Resend.
**Solución**: Ve a Resend > Domains, agrega tu dominio y configura los registros DNS (SPF, DKIM, DMARC).

### El build de Docker es muy lento
**Solución**: El Dockerfile usa multi-stage build con cache de dependencias. Si cambiaste `package.json`, la primera build será más lenta. Las builds subsecuentes son rápidas gracias al layer caching de Docker.

### Los estilos no se ven en producción
**Causa**: Tailwind CSS no está procesando los archivos correctos.
**Solución**: Verifica que `tailwind.config.ts` incluya todos los paths en `content`.

---

## 5. Checklist de Deploy

Antes de hacer push a producción, verifica cada punto:

- [ ] Editaste `/lib/content.ts` con tus datos reales (nombre, email, servicios)
- [ ] Reemplazaste `/public/og-image.png` con tu imagen personalizada (1200x630px)
- [ ] Configuraste todas las variables de entorno en Dokploy
- [ ] Generaste una contraseña segura para `POSTGRES_PASSWORD`
- [ ] Obtuviste tu API key de Resend (`RESEND_API_KEY`)
- [ ] Verificaste tu dominio de envío en Resend (para `CONTACT_EMAIL_FROM`)
- [ ] Configuraste `CONTACT_EMAIL_TO` con el email donde recibirás mensajes
- [ ] `NEXT_PUBLIC_SITE_URL` apunta a tu dominio real (sin trailing slash)
- [ ] Las migraciones de Prisma están generadas (`prisma/migrations/` tiene contenido)
- [ ] Probaste el formulario de contacto en desarrollo local
- [ ] El dominio está apuntando al servidor de Dokploy (DNS configurado)
- [ ] SSL/TLS está activo en Dokploy

---

## Stack Técnico

| Tecnología | Uso |
|-----------|-----|
| Next.js 14 | Framework React con App Router |
| Tailwind CSS | Estilos utilitarios |
| shadcn/ui | Componentes UI accesibles |
| Three.js | Escena 3D interactiva en el hero |
| PostgreSQL | Base de datos relacional |
| Prisma | ORM con type-safety |
| Resend | Envío de emails transaccionales |
| Zod | Validación de schemas |
| React Hook Form | Manejo de formularios |
| Framer Motion | Animaciones fluidas |
| Docker Compose | Infraestructura containerizada |

---

## Licencia

Este proyecto es de uso personal. Personaliza el contenido y hazlo tuyo.

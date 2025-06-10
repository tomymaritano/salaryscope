# 💸 SalaryBoard by HackLab.dog

> Transparencia salarial IT. Sin humo. Sin drama.  
> Open, anónimo, sin registros. Compará y compartí salarios reales de LATAM y Europa.

---

## 🇬🇧 About SalaryBoard

**SalaryBoard** is an open-source platform where tech workers can share and view salaries anonymously. Browse by country, role or seniority and contribute your own data without sign ups.

---

## 🚀 ¿Qué es SalaryBoard?

**SalaryBoard** es una plataforma open-source para consultar y compartir salarios del sector tech.  
Sin cuentas, sin e-mails, sin vueltas. Los datos son **anónimos** y abiertos a la comunidad.

- Consultá salarios por país, rol, seniority, stack y tipo de contrato.
- Filtrá y visualizá tendencias del mercado en tiempo real.
- Compartí tu propio salario en 1 minuto (sin identificadores personales).
- Proyecto open-source: [Ver código en GitHub](https://github.com/tomymaritano/salaryscope)
- Inspirado y mantenido por [hacklab.dog](https://hacklab.dog), comunidad y recursos tech para makers.

---

## 🧑‍💻 ¿Por qué lo hicimos?

Porque la data salarial debe ser **libre**, **anónima** y **de acceso público**.  
En el sector tech todavía hay mucha opacidad, desigualdad y bullshit corporativo.  
SalaryBoard nace para cambiar eso: **la información es tuya, no de una empresa**.

---

## 🌎 ¿Cómo funciona?

1. **Consultá:** Navegá los salarios cargados, filtrá por país, stack, rol, seniority y más.
2. **Cargá tu salario:** Completá el formulario sin registros.  
   _No pedimos mails, ni nombres, ni nada identificable._
3. **Visualizá tendencias:** Promedios, gráficos y comparativas.
4. **Descargá, hackeá, contribuí:** El código es tuyo. Hacé fork, PR o abrí un issue.

---

## 🛠️ Stack tecnológico

- **Frontend:** [Next.js 14](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), Framer Motion.
- **Backend:** [Prisma ORM](https://prisma.io/), [PostgreSQL](https://www.postgresql.org/).
- **Infra:** Deploy automático en [Vercel](https://vercel.com/) (también dockerizable).
- **Diseño:** Minimalista, mobile-first, glassmorphism sutil.
- **Animaciones:** Framer Motion.

---

## 🕶️ Características

- **100% anónimo:** No guardamos ni pedimos datos privados.
- **Open Data:** Podés consultar, analizar o reutilizar la data para lo que quieras.
- **Comunidad:** Cualquiera puede contribuir, proponer features o reportar bugs.
- **Mobile-first:** Funciona perfecto en cualquier dispositivo.
- **Sin publicidad, sin monetización oscura.**
- **Privacidad extrema:** El código es público, podés ver cómo se maneja cada dato.

---

## ⚡ Instalación local

```bash
# 1. Cloná el repo
git clone https://github.com/tomymaritano/salaryscope.git
cd salaryscope

# 2. Instalá dependencias
npm install

# 3. Configurá las variables de entorno (ver .env.example)
cp .env.example .env

# 4. Iniciá la base de datos (necesitás PostgreSQL local o remoto)
npx prisma migrate dev --name init

# 5. Iniciá la app
npm run dev
```

Abrí <http://localhost:3000> en tu navegador para verificar que todo funcione.

## ✅ Tests

Para ejecutar la suite de pruebas:

```bash
npm test
```

## Commands

- `npm run dev` – entorno de desarrollo
- `npm run build` – compilar la aplicación
- `npm start` – iniciar la versión compilada
- `npm test` – correr tests
- `npm run lint` – ejecutar ESLint
- `npm run format` – formatear con Prettier

## Observaciones y mejoras pendientes

- Eliminar rutas de depuración o protegerlas con autenticación.
- Crear archivo `.env.example` con las variables requeridas. ✅
- Agregar configuración de Tailwind (`tailwind.config.ts`). ✅
- Validar y limitar las peticiones a la API.
- Incluir tests y flujo de CI para lint y pruebas.

# 🚀 HackLab SalaryBoard

Transparencia salarial IT, sin bullshit.  
Accedé, consultá y compartí salarios reales de LATAM y Europa. Sin cuentas, sin mails, sin excusas.  
Proyecto open source, parte del ecosistema [hacklab.dog](https://hacklab.dog).

---

## 🧐 ¿Por qué existe este proyecto?

En la industria tech, la información sobre salarios suele estar fragmentada, llena de ruido o “filtrada” por empresas con otros intereses.  
**HackLab SalaryBoard** nace para cambiar eso: datos reales, comunidad abierta, anonimato total, y acceso libre.  
Forma parte de la familia de herramientas de [hacklab.dog](https://hacklab.dog) y sigue la misma filosofía hacker: compartir, abrir caminos y empoderar a quienes quieren crecer.

---

## ✨ Features

- Consultá salarios IT de LATAM y Europa
- Filtros por país, rol y seniority
- Cargá tu salario de forma 100% anónima
- Visualización de estadísticas y tendencias
- Mobile-first, UI minimalista y accesible
- Sin cuentas ni emails, sin tracking invasivo

---

## 🛠️ Stack tecnológico

- **Next.js 14**
- **React 18**
- **Tailwind CSS** para el diseño UI
- **Prisma ORM** y **PostgreSQL**
- Deploy serverless con **Vercel**

---

## 🚦 Cómo correrlo localmente

```bash
# 1. Cloná el repo
git clone https://github.com/tomymaritano/salaryscope.git
cd salaryscope

# 2. Instalá dependencias
npm install

# 3. Configurá las variables de entorno
# (ver .env.example para referencias)
cp .env.example .env.local
# Editá .env.local con tu DATABASE_URL de PostgreSQL

# 4. Ejecutá las migraciones de la base de datos
npx prisma migrate dev

# 5. Corré la app
npm run dev

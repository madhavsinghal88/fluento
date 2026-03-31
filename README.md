# 🚀 Fluento - AI-Powered Gamified Learning

Fluento is a modern, high-performance learning platform for kids that combines **AI-driven vocabulary building**, **live synchronized classrooms**, and a **secure gamification system**.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js (Turbopack), Tailwind CSS, Lucide Icons, Stomp.js (WebSockets)
- **Backend**: Java Spring Boot, Hibernate/JPA, Maven
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: OpenRouter (GPT-4o) for content generation and corrections.
- **Persistence**: Secure server-side XP calculations to prevent cheating.

---

## 🏗️ Architecture
- **`/frontend`**: Next.js 16 application.
- **`/backend`**: Spring Boot application.
- **`Dockerfile`**: Used specifically for **Render.com** deployments.

---

## 🏃 Local Quickstart

### 1. Configure Secrets
Copy the example file to a new `.env` file:
```bash
cp .env.example .env
```
Fill in your `OPENAI_API_KEY` and `SUPABASE_DB_PASSWORD`.

### 2. Start the Backend
```bash
cd backend
source ../.env && mvn spring-boot:run
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see it in action!

---

## 🚢 Deployment Guide

### **Backend (Render.com)**
1. Connect your Github repo.
2. Root Directory: `backend`.
3. Select **Docker** as the environment.
4. Add environment variables: `OPENAI_API_KEY`, `SUPABASE_DB_PASSWORD`.

### **Frontend (Vercel)**
1. Connect your Github repo.
2. Root Directory: `frontend`.
3. Select **Next.js** framework.
4. Add environment variables: `NEXT_PUBLIC_API_URL` (points to your Render URL).

---

## 🔐 Security
The application is configured to never track `.env` files in Git. All production secrets should be managed via your hosting provider's dashboard.

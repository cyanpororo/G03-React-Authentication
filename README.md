# G03-React-Authentication — README

A full-stack example app (React + Vite frontend, NestJS backend) demonstrating OAuth (Google), JWT-based auth with refresh, and a simple user store. This README covers local setup, how to reproduce production locally, token-storage rationale and security considerations, and third-party services used.

---

## Quick local setup (Windows)

Prerequisites:
- Node.js 18+ and npm (or pnpm/yarn)
- Optional: Supabase project if you want the provided backend user store

1) Clone & open:
```powershell
git clone https://github.com/cyanpororo/G03-React-Authentication.git
cd G03-React-Authentication
```

2) Backend
```powershell
cd backend
copy .env.example .env
# Edit backend/.env: SUPABASE_URL, SUPABASE_ANON_KEY, JWT_SECRET, GOOGLE_CLIENT_ID/SECRET, etc.
npm install
npm run start:dev
# Default: localhost:3000
```

3) Frontend
```powershell
cd ..\frontend
copy .env.example .env
# Edit frontend/.env: VITE_API_URL=http://localhost:3000, VITE_GOOGLE_CLIENT_ID=...
npm install
npm run dev
# Vite default: localhost:5173
```

Open the frontend URL in your browser and test sign-up / login flows.

---

## Public hosting URL

Live demo
- Deployed app: https://react-authentication-awad.onrender.com

Repository
- Source code: https://github.com/cyanpororo/G03-React-Authentication

To reproduce deployment:
- Set environment variables on host (JWT secrets, Supabase keys, Google OAuth client IDs).
- Build frontend with production env (VITE_API_URL set to your backend).
- Deploy backend to your provider (Render, Heroku, Fly, DigitalOcean, AWS, etc.) and configure HTTPS.
- Configure OAuth redirect URIs in Google console to include your deployed frontend origin.

---

## Token storage choices

- Access token: kept in memory on the client (not persisted) — reduces window for theft via XSS.
- Refresh token: persisted (example app uses localStorage for simplicity) to survive reloads and allow silent refresh.
- Refresh endpoint: backend exposes /auth/refresh to exchange a valid refresh token for a new access token.
- Cross-tab sync: implemented with BroadcastChannel/storage event so login/logout propagates across tabs.

Why this pattern:
- In-memory access tokens minimize XSS exposure because scripts can't read them after page reload.
- Refresh tokens allow long-lived sessions while keeping access tokens short-lived.

Tradeoffs:
- localStorage is simple and works cross-tab, but is vulnerable to XSS.
- HttpOnly cookies protect from XSS but require CSRF mitigations and careful cookie configuration (SameSite, domain, path).

---

## Third-party services

- Google OAuth (Google Cloud Console), server-side verification with Google public keys.
- Supabase — used as example user store; keys in backend/.env.
- Hosting providers: Render for frontend, Railway for backend.
- Libraries: React + Vite, NestJS, @nestjs/jwt, axios/fetch client, Tailwind (UI), service worker for offline caching in frontend/public.
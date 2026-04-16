# Roshix Solutions — Full Stack Website

A modern animated startup website inspired by FutureDesks, built for **Roshix Solutions Pvt. Ltd.**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Animations | Framer Motion |
| Backend | FastAPI (Python) |
| Database & Auth | Supabase (PostgreSQL + Auth) |
| Deployment | Vercel (frontend) + Railway/Render (backend) |

---

## Project Structure

```
roshix/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Home page
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   └── admin-dashboard/
│   │       ├── layout.tsx
│   │       └── page.tsx              # Admin dashboard
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── MarqueeStrip.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── StatsSection.tsx
│   │       ├── ProjectsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── TeamSection.tsx
│   │       ├── FaqSection.tsx
│   │       └── ContactSection.tsx
│   └── lib/
│       └── supabase.ts
├── backend/
│   ├── main.py                       # FastAPI app
│   ├── supabase_client.py            # Supabase helpers
│   ├── schema.sql                    # Database schema
│   └── requirements.txt
├── public/
│   └── images/
│       └── roshix-logo.png
└── .env.example
```

---

## Quick Start

### 1. Clone & Install

```bash
cd roshix
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
# Fill in your Supabase credentials
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `backend/schema.sql`
3. Copy your `SUPABASE_URL` and `ANON_KEY` to `.env.local`
4. Create an admin user via **Authentication > Users**, then run:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
   ```

### 4. Run Frontend

```bash
npm run dev
# → http://localhost:3000
```

### 5. Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# → http://localhost:8000
# → http://localhost:8000/docs  (Swagger UI)
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Public homepage (Hero, Services, Projects, Testimonials, Team, FAQ, Contact) |
| `/admin-dashboard` | Admin panel (stats, projects, messages, revenue chart) |

---

## Key Features

- **Animated Hero** with parallax, floating badges, and pulsing rings
- **Marquee tech strip** — dual-direction infinite scroll
- **Services grid** with hover glow effects
- **Animated stat counters** that trigger on scroll
- **Filterable project portfolio** with AnimatePresence transitions
- **Testimonial carousel** with dot navigation
- **Team grid** with social hover reveals
- **FAQ accordion** with smooth height animation
- **Contact form** with loading state and success screen
- **Admin Dashboard** — sidebar nav, project table with progress bars, messages panel, activity feed, revenue bar chart
- **FastAPI backend** with full CRUD for projects, inquiries, testimonials
- **Supabase** for database, auth, and Row Level Security

---

## Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend (Railway)
```bash
# railway.toml already configured for uvicorn
railway up
```

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `roshix-orange` | `#FF6B00` | Primary brand color |
| `roshix-orange-light` | `#FF8C33` | Gradient accent |
| `roshix-dark` | `#0A0A0A` | Page background |
| `roshix-dark-2` | `#111111` | Card/section bg |

---

Built with ❤️ for Roshix Solutions Pvt. Ltd., Pune.

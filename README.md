<div align="center">

# ✍️ AdvanceBackend Blog API

**A clean, modular blogging backend** built with Express 5, TypeScript, and Prisma.
Layered architecture · JWT auth with refresh-token rotation · Media uploads · Comments

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com)

</div>

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📡 API Reference](#-api-reference)
- [🗃️ Data Model](#️-data-model)
- [👤 Author](#-author)

---

## ✨ Features

| | |
|---|---|
| 🔐 **Auth** | Register/login, access + refresh token rotation, logout from one or all devices |
| 📝 **Posts** | Create, update, delete, list all posts, list your own posts, single media upload via Multer + Cloudinary |
| 💬 **Comments** | Add a comment to a post, list comments by post, delete a comment |
| ✅ **Validation** | Zod-based request validation on every write route |
| 🧱 **Layered architecture** | route → controller → service → repository, per module |
| 🌐 **DNS hardening** | App pins DNS resolution to Cloudflare/Google (`1.1.1.1`, `8.8.8.8`) to avoid flaky resolver issues |
| 🧯 **Centralized error handling** | Single global error middleware for consistent API error responses |

---

## 🧰 Tech Stack

<div align="center">

| Layer | Technology |
|:---|:---|
| **Runtime** | Node.js (TypeScript, ESM) |
| **Framework** | Express 5 |
| **Database** | PostgreSQL via Prisma ORM |
| **Auth** | JWT (access + refresh tokens), bcrypt |
| **File Uploads** | Multer + Cloudinary |
| **Validation** | Zod |

</div>

---

## 📂 Project Structure

```
├── prisma/
│   ├── schema.prisma          # Data model (User, Post, Comment, RefreshToken)
│   └── migrations/
└── src/
    ├── app.ts                 # Express app, middleware, route mounting
    ├── index.ts               # Server entrypoint
    ├── config/                # Env config
    ├── lib/                   # Prisma & Cloudinary clients
    ├── middleware/             # Auth, validation, multer, error handling
    ├── modules/
    │   ├── auth/               # register/login/refresh/logout
    │   ├── post/                # create/update/delete/list posts
    │   └── comment/             # create/list/delete comments
    │       # each module: route → controller → service → repository
    │       # plus schema (Zod), interface, mapper/response, container
    ├── types/
    └── utils/                  # AppError, CatchAsync, JWT/auth helpers, etc.
```

---

## 🚀 Getting Started

### Prerequisites

- 🟢 Node.js 18+
- 🐘 PostgreSQL database
- ☁️ Cloudinary account (for media uploads)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/dndmein-rgb/AdvanceBackend-Blog-Api.git
cd AdvanceBackend-Blog-Api
npm install
```

### 2️⃣ Configure Environment

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=4001

DATABASE_URL=postgresql://user:password@localhost:5432/blog_db

FRONTEND_URL=http://localhost:3000

JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_ACCESS_TOKEN_EXPIRY=15m

JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3️⃣ Set Up the Database

```bash
npm run db:generate   # generate Prisma client
npm run db:migrate    # run migrations
```

### 4️⃣ Run It

```bash
npm run dev     # 🔥 dev server with hot reload (tsx watch)
npm run build   # 🏗️  compile TypeScript
npm start       # ▶️  run compiled build
```

> Server starts on `http://localhost:<PORT>` 🎉

---

## 📡 API Reference

**Base URL:** `/api/v1`
**Utility:** `GET /health-check`

<details>
<summary>🔐 <b>Auth</b> — <code>/api/v1/auth</code></summary><br>

| Method | Endpoint | Access |
|:---|:---|:---|
| `POST` | `/register` | Public |
| `POST` | `/login` | Public |
| `POST` | `/refresh-token` | Public |
| `GET` | `/me` | 🔒 Authenticated |
| `POST` | `/logout` | 🔒 Authenticated |
| `POST` | `/logout-all-devices` | 🔒 Authenticated |

</details>

<details>
<summary>📝 <b>Posts</b> — <code>/api/v1/post</code></summary><br>

| Method | Endpoint | Access |
|:---|:---|:---|
| `GET` | `/` | Public — all posts |
| `GET` | `/your-posts` | 🔒 Authenticated — your own posts |
| `POST` | `/create` | 🔒 Authenticated · media upload (single file) |
| `PATCH` | `/:id` | 🔒 Authenticated |
| `DELETE` | `/:id` | 🔒 Authenticated |

</details>

<details>
<summary>💬 <b>Comments</b> — <code>/api/v1/comment</code></summary><br>

| Method | Endpoint | Access |
|:---|:---|:---|
| `POST` | `/create/post/:postId` | 🔒 Authenticated |
| `GET` | `/:postId` | 🔒 Authenticated — comments for a post |
| `DELETE` | `/delete/:commentId` | 🔒 Authenticated |

</details>

---

## 🗃️ Data Model

Core entities, defined in [`prisma/schema.prisma`](prisma/schema.prisma):

```
User ─┬─ RefreshToken[]
      ├─ Post[]    ─── Comment[]
      └─ Comment[]

Post ──── Comment[]   (a post has many comments)
```

- `Post` — title, description, optional `imageUrl`, owned by a `User`
- `Comment` — text body, linked to both a `Post` and the commenting `User`
- `RefreshToken` — per-token records for session/device management, cascade-deleted with the user

---

## 👤 Author

**Divyanshu Rathore**
[![GitHub](https://img.shields.io/badge/GitHub-dndmein--rgb-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/dndmein-rgb)

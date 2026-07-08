# 👷 Workers-Project

A **Node.js/Express** REST API for managing "Workers" data, backed by **MongoDB**, fully containerized with Docker. It ships with separate **development** and **production** setups, plus a handy Windows helper script so you never have to memorize Docker commands.

`Node.js 20` · `Express` · `MongoDB 7` · `Docker Compose` · `JWT Auth`

---

## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Accessing the App](#-accessing-the-app)
- [Testing the API](#-testing-the-api)
- [Good to Know](#-good-to-know)

---

## 🚀 Quick Start

New here? This is the fastest path to a running app.

1. **Clone it**
   ```bash
   git clone <your-repo-url>
   cd Workers-Project
   ```
2. **Add your secrets** — fill in `.env` (see [Environment Variables](#-environment-variables))
3. **Run it**
   - 🪟 Windows: double-click `ComposeFile.bat` → choose option **1**
   - 🐧 Mac/Linux: `docker compose up`
4. **Open it** → [http://localhost:3000](http://localhost:3000) 🎉

That's it — Docker builds the app, spins up MongoDB, and connects the two automatically.

---

## 🧰 Tech Stack

| | |
|---|---|
| **Runtime** | Node.js 20 (Alpine) |
| **Framework** | Express |
| **Database** | MongoDB 7 (via Mongoose) |
| **Auth** | JWT (`JWT_SECRET`) |
| **Containers** | Docker + Docker Compose (multi-stage build for dev/prod) |

---

## 🗂️ Project Structure

```
Workers-Project/
├── .github/
│   └── workflows/
│       └── docker.yml          # CI/CD workflow
├── config/
│   └── db.js                   # MongoDB connection (Mongoose)
├── controllers/
│   └── worker.controller.js    # Request handlers / business logic for Workers
├── model/
│   └── Workers.js               # Mongoose schema/model for a Worker
├── node_modules/                # Installed npm dependencies (not committed)
├── public/
│   ├── api.js                   # Front-end script for calling the API
│   ├── index.html                # Static front-end page (served at "/")
│   └── style.css                 # Front-end styling
├── route/
│   └── workersRoute.js          # Express routes, mounted at /api/allworkers
├── .dockerignore                 # Files/folders excluded from the Docker build context
├── .env                           # Environment variables for development
├── .env.production                # Environment variables for production
├── .gitignore                     # Files/folders excluded from git
├── app.js                          # Application entry point
├── ComposeFile.bat                 # Interactive helper script to run Docker Compose commands
├── docker-compose.yml               # Base Docker Compose configuration
├── docker-compose.override.yml      # Overrides automatically applied in development
├── docker-compose.prod.yml           # Additional configuration for production
├── Dockerfile                         # Multi-stage build: development & production
├── load-workers.js                     # Script to seed/load worker data
├── package.json / package-lock.json     # Node.js dependencies and scripts
├── readme.md                             # This file
└── requests.http                          # Sample HTTP requests for testing the API
```

---

## ⚙️ How It Works

- **`app.js`** boots the Express app, connects to MongoDB via **`config/db.js`**, and mounts the Workers API at **`/api/allworkers`**.
- **`model/Workers.js`** defines the Mongoose schema for a Worker.
- **`controllers/worker.controller.js`** handles the actual logic — create, read, update, delete.
- **`route/workersRoute.js`** wires HTTP routes to those controller functions.
- **`public/`** is a small static front end (`index.html`, `style.css`, `api.js`) served directly by Express.
- **`load-workers.js`** seeds the database with sample worker data, if you want some to play with.
- **`requests.http`** has ready-made requests for testing the API (works great with the VS Code REST Client extension).

### 🔌 Endpoints

| Endpoint | What it does |
|---|---|
| `GET /` | Serves the front end |
| `GET /health` | Health check — app status, DB connection, uptime, environment |
| `/api/allworkers/*` | The Workers API (see `route/workersRoute.js` or `requests.http`) |

> The app also checks incoming requests against a CORS allow-list and **won't start at all** if `JWT_SECRET` isn't set — so don't skip the env setup below!

### 🐳 The Docker Setup, Simplified

Three Compose files work together depending on how you run things:

| File | When it's used | What it adds |
|---|---|---|
| `docker-compose.yml` | Always | Base setup — the `app` and `mongodb` services |
| `docker-compose.override.yml` | Automatically, in dev | Hot reload, dev ports (`3000`, `27017`) |
| `docker-compose.prod.yml` | Only when you ask for it | Production build, port `443`, auto-restart |

**In development**, your code folder is mounted straight into the container, so when you save a file, the app reloads instantly — no rebuilding needed.

**In production**, the code is baked into the image at build time (no live mounting), the app listens on port `443`, and both the app and database will auto-restart if they crash or the machine reboots.

---

## 🔑 Environment Variables

You'll need two files: `.env` for development and `.env.production` for production. Both use the same variables:

| Variable | What it's for |
|---|---|
| `PORT` | Port the app listens on inside the container (defaults to `3000`) |
| `DB_NAME` | MongoDB database name |
| `MONGO_URL` | MongoDB connection string, e.g. `mongodb://<user>:<password>@mongodb:27017/<db_name>?authSource=admin` |
| `DB_USER` | MongoDB root username |
| `DB_PASSWORD` | MongoDB root password |
| `JWT_SECRET` | Secret for signing JWTs — **required**, or the app won't start |

> 🔒 Keep real secrets out of git — `.env` and `.env.production` should stay in `.gitignore`.

---

## ▶️ Running the Project

### Option A — `ComposeFile.bat` (Windows, recommended)

Just double-click `ComposeFile.bat` and pick a number:

```
1. Compose up development environment
2. Compose up production environment
3. Compose down production environment
4. Compose down development environment
5. See which images are running and their size
```

| Pick | It runs |
|---|---|
| **1** | `docker compose up` |
| **2** | `docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up` |
| **3** | `docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml down` |
| **4** | `docker compose down` |
| **5** | `docker ps` |

### Option B — Manual commands (Mac/Linux/anywhere)

**Start developing:**
```bash
docker compose up
```
**Stop:**
```bash
docker compose down
```

**Go to production:**
```bash
docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up
```
**Stop production:**
```bash
docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml down
```

**Peek at what's running:**
```bash
docker ps
```

---

## 🌐 Accessing the App

| Environment | URL |
|---|---|
| Development | [http://localhost:3000](http://localhost:3000) |
| Dev health check | [http://localhost:3000/health](http://localhost:3000/health) |
| Production | `https://<your-host>` (host port `443` → container port `3000`) |
| MongoDB (dev only) | `localhost:27017` |

In production, MongoDB isn't exposed to the outside world at all — only the `app` container can reach it, over Docker's internal network.

---

## 🧪 Testing the API

- Open `requests.http` in an HTTP client (like the VS Code REST Client extension) and fire off pre-built requests.
- Or just visit [http://localhost:3000](http://localhost:3000) and use the front end.

---

## 💡 Good to Know

- Docker Desktop needs to be running before you use any command above.
- In dev, code changes hot-reload automatically — no rebuild needed for everyday edits.
- No `JWT_SECRET`? The app exits immediately. Set it first.
- The `app` container waits for MongoDB to be healthy before starting — no race conditions.
- MongoDB data lives in a Docker volume (`mongodata`) and survives `docker compose down`. Want a clean slate? Use `docker compose down -v`.
- Changed a `.env` file? Restart the containers to pick it up.
- You never need to run `npm install` locally — dependencies are installed inside the image automatically.
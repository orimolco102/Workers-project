<div align="center">

# 👷 Workers Project

### A Production-Ready RESTful API for Workforce Management

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

> A scalable, containerized backend service built with Node.js, Express, and MongoDB — fully automated with GitHub Actions CI/CD pipelines and deployed via Docker.

<br/>

[📖 API Docs](#-api-endpoints) · [🚀 Quick Start](#-quick-start) · [🐳 Docker Setup](#-docker-setup) · [⚙️ CI/CD Pipeline](#%EF%B8%8F-cicd-pipeline)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Docker Setup](#-docker-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [CI/CD Pipeline](#%EF%B8%8F-cicd-pipeline)
- [Contributing](#-contributing)

---

## 🧠 About the Project

The **Workers Project** is a full-featured RESTful API designed to manage workforce data efficiently. It follows the **MVC (Model-View-Controller)** architectural pattern, ensuring separation of concerns, scalability, and ease of maintenance.

Key highlights:
- 🔧 **Clean Architecture** — MVC pattern with dedicated layers for routing, controllers, and models
- 🐳 **Fully Containerized** — Docker & Docker Compose for consistent environments across dev and production
- 🔄 **Automated CI/CD** — GitHub Actions workflow handles linting, testing, and Docker image publishing on every push
- 🌱 **Database Seeding** — Includes a `load-workers.js` script to quickly seed your MongoDB instance
- 🌐 **Frontend Ready** — Ships with a static `public/` layer (`index.html`, `api.js`, `style.css`) for immediate UI interaction

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (via Mongoose) |
| **Containerization** | Docker & Docker Compose |
| **CI/CD** | GitHub Actions |
| **Config Management** | dotenv |
| **API Testing** | REST Client (`requests.http`) |

---

## 📁 Project Structure

```
workers-project/
│
├── .github/
│   └── workflows/
│       └── docker.yml          # GitHub Actions CI/CD pipeline
│
├── config/
│   └── db.js                   # MongoDB connection setup
│
├── controllers/
│   └── worker.controller.js    # Business logic for worker operations
│
├── model/
│   └── Workers.js              # Mongoose schema & model
│
├── public/
│   ├── api.js                  # Frontend API calls
│   ├── index.html              # Main UI entry point
│   └── style.css               # Styling
│
├── route/
│   └── workersRoute.js         # Express route definitions
│
├── .dockerignore
├── .env                        # Environment variables (not committed)
├── .gitignore
├── app.js                      # Express app initialization
├── docker-compose.yml          # Multi-container orchestration
├── Dockerfile                  # Container image definition
├── load-workers.js             # Database seeder script
├── package.json
└── requests.http               # API test requests
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) `v9+`
- [MongoDB](https://www.mongodb.com/) (local or Atlas URI)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/workers-project.git
cd workers-project

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and port

# 4. (Optional) Seed the database
node load-workers.js

# 5. Start the development server
npm start
```

The server will be running at `http://(OriMo.co.il):8080`

---

## 🐳 Docker Setup

Run the entire application stack (API + MongoDB) with a single command using Docker Compose.

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

### Docker Architecture

```
┌─────────────────────────────────┐
│         Docker Network          │
│                                 │
│  ┌──────────────┐               │
│  │  Node.js API │ :3000         │
│  │  (Express)   │◄──────────── ─┼── HTTP Requests
│  └──────┬───────┘               │
│         │                       │
│  ┌──────▼───────┐               │
│  │   MongoDB    │ :27017        │
│  │  Container   │               │
│  └──────────────┘               │
└─────────────────────────────────┘
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory. Reference the table below:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongo:27017/workersdb` |
| `NODE_ENV` | App environment | `development` / `production` |

> ⚠️ Never commit your `.env` file. It is included in `.gitignore`.

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Retrieve all workers |
| `GET` | `/id/:id` | Get a single worker by ID |
| `POST` | `/createworker` | Create a new worker |
| `DELETE` | `/deleteworker/:id` | Delete a worker |
| `PUT` | `/workers/:id` | Update an existing worker |

### Example Request

```http
POST {{baseUrl}}/api/allworkers/createworker
Content-Type: application/json
Host: (OriMo):8080
```

### Example Response

```json
[
  {
    "_id": "64f2a3b12c8e4d001f3a9b21",
    "name": "Jane Doe",
    "role": "Engineer",
    "department": "R&D",
    "phone": 0XXXXXXXXX,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

> 💡 Use the included `requests.http` file with the [REST Client VS Code extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for quick endpoint testing.

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** to automate the build and deployment pipeline on every push to `main`.

### Workflow: `.github/workflows/docker.yml`

```
Push to main
     │
     ▼
┌─────────────┐
│  Checkout   │
│    Code     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Build      │
│  Docker     │
│   Image     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Push to   │
│  Docker Hub │
│ / GHCR      │
└─────────────┘
```

The pipeline automatically:
- ✅ Builds the Docker image on every commit
- ✅ Runs health checks to validate the container
- ✅ Publishes the image to the container registry

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repository, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
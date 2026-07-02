const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const workerRoutes = require("./route/workersRoute");
const { log } = require("console");
const { default: mongoose, STATES } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  "http://127.0.0.1:5000",
  "http://127.0.0.1:5501",
  "http://localhost:5000",
  "http://localhost:5501",
  "http://localhost:3000",
  "http://localhost:8080",
  "https://workers-project.onrender.com",
  process.env.RENDER_EXTERNAL_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("not allowed by cors origin"));
      }
    },
  }),
);

// app.use('/js', express.static(path.join(__dirname, './public/api.js')));
// app.use('/css', express.static(path.join(__dirname, './public/style.css')));
app.use(express.static(path.join(__dirname, "/public")));

connectDB();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/health", (req, res) => {
  const dbState = ["connected", "discon", "connecting", "disconnecting"];
  const dbConnected = mongoose.connection.readyState === 1;

  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ok" : "Error",
    db: dbState[mongoose.connection.readyState],
    runtime: `${Math.floor(process.uptime())}s`,
    enviornment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/allworkers", workerRoutes);
app.listen(PORT, () => {
  console.log(`app is runnng ${PORT}`);
});

const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
require('dotenv').config();
const path = require('path')

const workerRoutes = require("./route/workersRoute");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:8080",
            "http://192.168.10.212:3000", "http://192.168.10.212:5500", "http://192.168.10.212:8080"]
}));

// app.use('/js', express.static(path.join(__dirname, './public/api.js')));
// app.use('/css', express.static(path.join(__dirname, './public/style.css')));
app.use(express.static(path.join(__dirname, "/public")));

connectDB();

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.use("/api/allworkers",workerRoutes);

app.listen(PORT, ()=> {
    console.log(`app is runnng ${PORT}`);
});
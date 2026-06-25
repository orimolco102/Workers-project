const express = require('express');
const { getAllWorkers, getWorkerID, getWorkerByName, createWorker, delWorker } = require('../controllers/worker.controller');

const routes = express.Router();

routes.get("/", getAllWorkers);
routes.get("/id/:id", getWorkerID);
routes.get("/name/:name", getWorkerByName);
routes.post("/createworker", createWorker);
routes.delete("/deleteworker/:id", delWorker);


module.exports = routes;
const { response } = require('express');
const Worker = require("../model/Workers");

async function getAllWorkers(req, res) {
    try {
        const allworkers = await Worker.find();
        res.status(200).json(allworkers);
        console.log(allworkers);

    } catch (error) {
        res.status(500).json({message: "Internal server error!", error: error.message})
    }
}

async function getWorkerID (req, res) {

    try {
        const WorkerID = await Worker.findById(req.params.id);
        console.log(WorkerID);
        
        if (!Worker) {
            return res.status(404).json({message: "couldent find a user", error: error.message})
        }
        return res.status(200).json(WorkerID);
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

async function getWorkerByName(req, res) {
    try {
        const Workername = await Worker.findOne({name: req.params.name});
        if(!Workername){
            return res.status(404).json({message: "couldent find a user", error: error.message})
        }
        return res.status(200).json(Workername);
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }

}


async function createWorker(req, res ) {
    try {
        const newWorker = await Worker.create(req.body);
        res.status(201).json(newWorker);
    } catch (error) {
        res.status(400).json({message: "Internal server error", error: error.message})
    }
}


async function delWorker(req, res) {
    try {
        const del = await Worker.findByIdAndDelete(req.params.id)
        if(!del){
            return res.status(404).json({message: "Worker not found"})
        }
        res.status(200).json({message: "Worker Deleted successfuly", Worker: delWorker})
    } catch (error) {
        res.status(400).json({message: "Internal server error", error: error.message})
    }
}

// async function loadDefault() {

// }

module.exports = {
    getAllWorkers,
    getWorkerID,
    getWorkerByName,
    createWorker,
    delWorker
}
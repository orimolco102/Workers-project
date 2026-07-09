const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
const Worker = require("./model/Workers");

const workers = [
  {
    name: "Yossi Cohen",
    email: "yossi.c@company.com",
    phone: "0501234567",
    department: "DevOps",
    role: "Mid-Level Engineer",
  },
  {
    name: "Sarah Levi",
    email: "sarah.l@company.com",
    phone: "0527654321",
    department: "Engineering",
    role: "Team Lead",
  },
  {
    name: "Michael Avraham",
    email: "michael.a@company.com",
    phone: "0549876543",
    department: "Engineering",
    role: "Junior Specialist",
  },
  {
    name: "Dana Mizrahi",
    email: "dana.m@company.com",
    phone: "0531112223",
    department: "HR",
    role: "Director",
  },
  {
    name: "David Peretz",
    email: "david.p@company.com",
    phone: "0504445556",
    department: "DevOps",
    role: "Senior Consultant",
  },
  {
    name: "Noa Katz",
    email: "noa.k@company.com",
    phone: "0586667778",
    department: "Marketing",
    role: "Junior Specialist",
  },
  {
    name: "Ron Shapira",
    email: "ron.s@company.com",
    phone: "058889990",
    department: "Finance",
    role: "Team Lead",
  },
  {
    name: "Maya Biton",
    email: "maya.b@company.com",
    phone: "0543334445",
    department: "Sales",
    role: "Mid-Level Engineer",
  },
];


async function loadeWorkers() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`);
    
    await Worker.deleteMany({});
    console.log("Users deleted");

    await Worker.insertMany(workers);
    console.log("Users loaded");

  } catch (error) {
    console.log("Error on loading ",error);
  } finally {
    await mongoose.disconnect();
    console.log("close connection");
  }
}

loadeWorkers();

/*  */

/* const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const allStudents = await prisma.student.findMany();
    console.log(allStudents);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); */

require('dotenv').config();

const express = require("express");
const app = express();

app.use(express.json());

const studentRoutes = require("./routes/student.routes.js");

app.use("/api/student", studentRoutes);


app.get("/gen-token", (req, res) => {
    
});

app.get("/gen-password", (req, res) => {

});

app.listen(5000, () => {
    console.log("Data base online on port 5000");
});

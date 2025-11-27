// Simple Node.js + Express Server (Single File App)

const express = require("express");
const app = express();
app.use(express.json());   // to read JSON body

// Temporary in-memory data
let students = [
    { id: 1, name: "Priyanshu" },
    { id: 2, name: "Aarav" }
];

// ------------------------ ROUTES ---------------------------

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Simple Node.js + Express Server!");
});

// GET all students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST new student
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name
    };
    students.push(newStudent);
    res.json({ message: "Student Added", data: newStudent });
});

// PUT update student
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) return res.status(404).json({ error: "Student not found" });

    student.name = req.body.name;
    res.json({ message: "Student Updated", data: student });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.json({ message: "Student Deleted" });
});

// ------------------------ START SERVER ---------------------

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

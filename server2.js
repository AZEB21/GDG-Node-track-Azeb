const http = require("http");

let students = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && req.url === "/students") {
        res.end(JSON.stringify(students));
    }

    else if (req.method === "POST" && req.url === "/students") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const data = JSON.parse(body);

            const newStudent = {
                id: idCounter++,
                name: data.name
            };

            students.push(newStudent);
            res.end(JSON.stringify(newStudent));
        });
    }

    else if (req.method === "PUT" && req.url.startsWith("/students/")) {
        const id = parseInt(req.url.split("/")[2]);
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const data = JSON.parse(body);
            const student = students.find(s => s.id === id);

            if (!student) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ message: "Student not found" }));
            }

            student.name = data.name;
            res.end(JSON.stringify(student));
        });
    }

    else if (req.method === "DELETE" && req.url.startsWith("/students/")) {
        const id = parseInt(req.url.split("/")[2]);
        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "Student not found" }));
        }

        students.splice(index, 1);

        res.end(JSON.stringify({ message: "Student deleted successfully" }));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});
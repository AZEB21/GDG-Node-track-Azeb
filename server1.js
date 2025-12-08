const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.write("Welcome to the Home Page");
    res.end();

  } else if (req.method === "GET" && req.url === "/info") {
    res.write("This is the information page");
    res.end();

  } else if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const jsonData = JSON.parse(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(jsonData));
    });

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
import express from "express";

const app = express();

const hostname = "localhost";

const port = 8017;

app.get("/", (req, res) => {
	res.json(`<h1>Hello world Nodejs</h1>`);
});

app.listen(port, hostname, () => {
	console.log(`Hello world,I am running server at ${hostname}:${port}`);
});

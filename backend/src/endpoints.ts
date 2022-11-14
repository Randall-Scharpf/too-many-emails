import express from 'express';

const server = express();

server.use(express.json());
server.use(express.urlencoded());

server.get("/echo-get", (req, res) => {
    res.json(req.query);
    console.log(req.url);
})

server.post("/echo-post", (req, res) => {
    res.json(req.body);
    console.log(req.url);
})

server.listen(80);

export { }
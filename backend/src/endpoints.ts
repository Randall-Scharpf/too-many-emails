import express from 'express';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/echo-get", (req, res) => {
    res.json(req.query);
    console.log(req.url);
})

server.post("/echo-post", (req, res) => {
    res.json(req.body);
    console.log(req.url);
})

const db = require('./db');
server.post("/db-post", (req, res) => {
    if (req.body.value !== undefined) {
        console.log("writing", req.body.key, req.body.value);
        db.writeKv(req.body.key, req.body.value);
        res.json({ key: req.body.key, value: req.body.value });
    }
    else {
        console.log("reading", req.body.key);
        db.readKv(req.body.key, (v) => res.json({ key: req.body.key, value: v }));
    }
})

server.listen(80);

export { }
import express from 'express';

const server = express();

server.get("/test-ep", (req, res) => {
    let weight : number = parseFloat(req.query.pounds.toString());
    res.send(
        isNaN(weight) ?
        "ur momma so fat that her weight isn't even a number" :
        "ur momma so fat she's " + weight.toFixed(2) + " pounds, which is " + (weight/2.2).toFixed(2) + " kilograms"
    );
})

server.post("/test-post", (req, res) => {
    let weight : number = parseFloat(req.query.kilos.toString());
    res.send(
        isNaN(weight) ?
        "ur momma so fat that her weight isn't even a number" :
        "ur momma so fat she's " + (weight*2.2).toFixed(2) + " pounds, which is " + weight.toFixed(2) + " kilograms"
    );
})

server.listen(80);

export { }
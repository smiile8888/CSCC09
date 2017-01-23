var express = require('express');
var app = express();

app.use(express.static('frontend'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

app.get('/api/messages/', function(req, res, next) {
    res.json([{"content": "Hello World!", "author": "Me"}, {"content": "Hello World!", "author": "Me"}]);
    next();
})

app.post('/api/messages/', function(req, res, next) {
    res.json({"id": 48});
    next();
})

app.delete('/api/messages/:id/', function(req, res, next) {
    res.json({"id": 48});
    next();
})

app.post('/', function (req, res, next) {
    res.json(req.body);
    next();
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});

app.listen(3000, function () {
    console.log('app listening on port 3000!')
});

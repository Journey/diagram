var express = require("express");
var app = express();
console.log("express dir name:" + __dirname)
app.use("/app", express.static('../app'));

app.get('/test', function(req, res) {
    res.send('hello world');
});

var server = app.listen(3000, function() {
    console.log('');
});
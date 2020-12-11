require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function(){
    console.log('Server running on port 3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/Lab6.html');
});


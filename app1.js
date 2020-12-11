require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('scores.db');
const { body, validationResult } = require('express-validator');


const postScore = "INSERT INTO leaderboard (email, name, score) VALUES ($1, $2, $3);";
const getScore = "SELECT * FROM leaderboard ORDER BY score ASC;";


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function(){
    console.log('Server running on port 3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/Lab7.html');
});

app.post('/board', function(req, res){
    const validErrors = validationResult(req);
    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        res.status(400).json({ errors: validErrors.array() });
    } 
    else {
        const email = req.body.email;
        const name = req.body.name;
        const score = req.body.score;

        const insert = db.prepare(postScore);
        insert.run(email, name, score);
        insert.finalize();

        const query = db.prepare(getScore);
        query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            res.status(200).json(rows);
        }
        }); 
    }
});

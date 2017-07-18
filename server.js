//Database
import './config/config.js'; //ENV variables, sets the appropriate port and mongoDB URI
import mongoose from './database/mongoose.js';//Will use the ENV variables and connect to the correct DB

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

//model and routes
import Game from './app/models/game';
import {getGames, getgame, postGame, deleteGame} from './app/routes/game';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev')); //Concise coloured output

app.use(express.static(__dirname + '/client/dist'));

//Enable CORS to make HTTP requests from webpack-dev-server
app.use((req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//API Routes
app.route('/games')
//create a game
    .post(postGame)
//get all games
    .get(getGames);

app.route('/games/:id')
//get a single game
    .get(getGame)
//delete a single game
    .delete(deleteGame);

//All other requests, send back to homepage
app.route("*").get((req, res) => {
    res.sendFile('client/dist/index.html', {root: __dirname});
});

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});
import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please enter a name'
    },
    year: {
        type: Number,
        required: "Please enter the year of the game"
    },
    description: {
        type: String,
        required: "Please enter a description"
    },
    picture: {
        type: String,
        required: "Please attach a picture"
    },
    postDate: { //Timestamp
        type: Date,
        default: Date.now
    }
});

var Game = mongoose.model('Game', GameSchema);

export default Game; //Game model
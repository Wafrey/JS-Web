const { Schema, model } = require('mongoose');

const workoutLogSchema = new Schema({
    name: String,
    date: Date,
    exercises: [
        {
            name: String,
            reps: Number,
            sets: Number,
        }
    ]
});

module.exports = model('workoutLog', workoutLogSchema);
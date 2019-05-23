const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({

    days: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    car: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Car',
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;
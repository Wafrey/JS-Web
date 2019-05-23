const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({

    model: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    imageUrl: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    pricePerDay: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    isRented: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    }
});

const Car= mongoose.model('Car', carSchema);
module.exports = Car;
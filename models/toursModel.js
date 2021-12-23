const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour has to be named'],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'Tour has to price'],
    }
})

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;
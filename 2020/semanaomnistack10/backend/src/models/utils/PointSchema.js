const mongoose = require('mongoose');

//tipo utilizado no schema para lat long
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates:{
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;
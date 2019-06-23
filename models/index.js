const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var weatherSchema = new Schema({
    temp: Number,
    humidity: Number,
    temp_min: Number,
    temp_max: Number,
    condition: String,
    cloudiness: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('weather', weatherSchema);
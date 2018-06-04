const mongoose = require('mongoose');

const DidItRainSchema = new mongoose.Schema({
    Date: Number,
    Prcp: Number,
    Rain: Boolean,
});

module.exports = mongoose.model('Movie', DidItRainSchema);
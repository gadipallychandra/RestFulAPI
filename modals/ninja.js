//in Modals create MongoDB required
const mongoose = require('mongoose');
//Create Schema on Mongodb
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
        //distanceField: String
    },
    coordinates: {
        type: [Number],
        index: "2dsphere",
    }
});
//create Ninja Schema
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    age: {
        type: String,
    },
    position: {
        type: String,
        required: [true, 'Position is required']
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema,

    //add geo location
});

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;
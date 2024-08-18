const mongoose = require('mongoose')

const packSchema = new mongoose.Schema({
    packtName : String,
    title : String,
    description : String,
    category : String,
    packImage : [],
    price : Number,
    discount : Number,
    endDate : String,
    status : String

},{
    timestamps : true
})
const packModel = mongoose.model("offers",packSchema)

module.exports = packModel
const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    Roomnumber : String,
    category : String,
    type : String,
    airconditioning : String,
    beds : String,
    RoomImage : [],
    status : String

},{
    timestamps : true
})
const RoomModel = mongoose.model("rooms",RoomSchema)

module.exports = RoomModel
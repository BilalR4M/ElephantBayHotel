const RoomModel = require("../../model/RoomModel")

const getRoomController = async(req,res)=>{
    try{
        const allRoom = await RoomModel.find().sort({ createdAt : -1 })

        res.json({
            message : "All Rooms",
            success : true,
            error : false,
            data : allRoom
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getRoomController
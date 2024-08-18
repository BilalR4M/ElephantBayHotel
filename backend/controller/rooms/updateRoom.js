const uploadPermission = require("../../helpers/permission")
const RoomModel = require("../../model/RoomModel")

async function updateRoomController(req,res){
    try {
        if(!uploadPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody} = req.body
        const updateRoom = await RoomModel.findByIdAndUpdate(_id,resBody)
        
        res.json({
            message : "Room update successfully",
            data : updateRoom,
            success : true,
            error : false
        })
        
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        }) 
    }
}
module.exports = updateRoomController
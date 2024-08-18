const RoomModel = require("../../model/RoomModel")
const getCategorywiseRoom = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query
        const Room = await RoomModel.find({ category })

        res.json({
            data : Room,
            message : "Package",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategorywiseRoom

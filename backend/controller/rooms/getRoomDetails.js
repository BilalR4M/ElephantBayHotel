const RoomModel = require("../../model/RoomModel")

const getRoomDetails = async(req,res)=>{
  try{
    const { RoomId } = req.body

    const Room = await RoomModel.findById(RoomId)

    res.json({
        data : product,
        message : "Ok",
        success : true,
        error : false
    })

    
}catch(err){
    res.json({
        message : err?.message  || err,
        error : true,
        success : false
    })
}

}

module.exports = getRoomDetails
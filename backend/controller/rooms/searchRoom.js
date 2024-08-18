const RoomModel = require("../../model/RoomModel")

const searchRoom = async(req,res)=>{
    try{
        const query = req.query.q 
        
        const regex = new RegExp(query,'i','g')

        const Room = await RoomModel.find({
            "$or" : [
                {
                    RoomName : regex
                },
                {
                    category : regex
                }
            ]
        })


        res.json({
            data  : Room ,
            message : "Search Room list",
            error : false,
            success : true
        })
    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = searchRoom
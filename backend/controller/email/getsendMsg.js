const EmailMessage = require("../../model/emailMessageModel")

const getSendMessagesController = async(req,res)=>{
    try{
        const allMessagese = await EmailMessage.find().sort({ createdAt : -1 })
        console.log("userid all Messagese",req.email)
        res.json({
            message : "send emails message",
            success : true,
            error : false,
            data : allMessagese
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getSendMessagesController
const Emailmodel = require("../../model/emailmodel")

const getEmailController = async(req,res)=>{
    try{
        const allEmails = await Emailmodel.find().sort({ createdAt : -1 })

        res.json({
            message : "All Emails",
            success : true,
            error : false,
            data : allEmails
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getEmailController
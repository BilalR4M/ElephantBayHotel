const uploadPermission = require("../../helpers/permission")
const packageModel = require("../../model/packageModel")

async function updatepackageController(req,res){
    try {
        if(!uploadPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody} = req.body
        const updatePackage = await packageModel.findByIdAndUpdate(_id,resBody)
        
        res.json({
            message : "Package update successfully",
            data : updatePackage,
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
module.exports = updatepackageController
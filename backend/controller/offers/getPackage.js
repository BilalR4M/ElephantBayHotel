const packModel = require("../../model/packageModel")

const getPackageController = async(req,res)=>{
    try{
        const allPackage = await packModel.find().sort({ createdAt : -1 })

        res.json({
            message : "All Packages",
            success : true,
            error : false,
            data : allPackage
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getPackageController
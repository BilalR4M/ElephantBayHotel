const packageModel = require("../../model/packageModel")
const getCategorywisePackage = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query
        const pack = await packageModel.find({ category })

        res.json({
            data : pack,
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

module.exports = getCategorywisePackage

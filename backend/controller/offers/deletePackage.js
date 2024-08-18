const uploadPermission = require("../../helpers/permission");
const packageModel = require("../../model/packageModel");

async function deletePackageController(req, res) {
    try {
        if (!uploadPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { _id } = req.body; // Assuming you send the package ID in the request body

        // Find the package by ID and delete it
        const deletedPackage = await packageModel.findByIdAndDelete(_id);

        if (!deletedPackage) {
            throw new Error("Package not found");
        }

        res.json({
            message: "Package deleted successfully",
            data: deletedPackage,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deletePackageController;
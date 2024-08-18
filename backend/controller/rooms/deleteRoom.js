const uploadPermission = require("../../helpers/permission");
const RoomModel = require("../../model/RoomModel");

async function deleteRoomController(req, res) {
    try {
        if (!uploadPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { _id } = req.body; // Assuming you send the package ID in the request body

        // Find the package by ID and delete it
        const deletedPackage = await RoomModel.findByIdAndDelete(_id);

        if (!deletedPackage) {
            throw new Error("Room not found");
        }

        res.json({
            message: "Room deleted successfully",
            data: deleteRoom,
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

module.exports = deleteRoomController;
const uploadPermission = require("../../helpers/permission");
const RoomModel = require("../../model/RoomModel");

async function UploadRoomController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const payload = {
        ...req.body,
        status: "Deactivate"
    }
    const uploadRoom = new RoomModel(payload);
    const saveProduct = await uploadRoom.save();

    res.status(201).json({
      message: "Room upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadRoomController;

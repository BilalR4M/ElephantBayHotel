const uploadPermission = require("../../helpers/permission");
const packageModel = require("../../model/packageModel");

async function UploadPackageController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const payload = {
        ...req.body,
        status: "Deactivate"
    }
    const uploadPackage = new packageModel(payload);
    const saveProduct = await uploadPackage.save();

    res.status(201).json({
      message: "package upload successfully",
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

module.exports = UploadPackageController;

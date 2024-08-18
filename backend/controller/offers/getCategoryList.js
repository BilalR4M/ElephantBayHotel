const packageModel = require("../../model/packageModel");

const getCategoryWisePackage = async (req, res) => {
  try {
    const packageCategory = await packageModel.distinct("category");
    console.log("category", packageCategory);

    //array to store one product from each category
    const packageByCategory = [];

    for (const category of packageCategory) {
      const package = await packageModel.findOne({ category });

      if (package) {
        packageByCategory.push(package);
      }
    }

    res.json({
      data: packageByCategory,
      message: "Package",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWisePackage;

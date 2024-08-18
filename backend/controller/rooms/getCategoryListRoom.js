const packageModel = require("../../model/RoomModel");

const getCategoryWiseRoom = async (req, res) => {
  try {
    const RoomCategory = await RoomModel.distinct("category");
    console.log("category", RoomCategory);

    //array to store one product from each category
    const RoomByCategory = [];

    for (const category of RoomCategory) {
      const Room = await RoomModel.findOne({ category });

      if (Room) {
        RoomByCategory.push(package);
      }
    }

    res.json({
      data: RoomByCategory,
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

module.exports = getCategoryWiseRoom;

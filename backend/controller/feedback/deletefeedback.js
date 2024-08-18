const Feedback = require('../../model/Feedback');

async function deleteFeedbackController(req, res) {
    try {


        const { _id } = req.body; // Assuming you send the package ID in the request body

        const deletedfeedback = await Feedback.findByIdAndDelete(_id);

        if (!deletedfeedback) {
            throw new Error("feedback not found");
        }

        res.json({
            message: "feedback deleted successfully",
            data: deletedfeedback,
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

module.exports = deleteFeedbackController;

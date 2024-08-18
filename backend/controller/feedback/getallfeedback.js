const Feedback = require('../../model/Feedback');

async function getAllFeedbacksController(req, res) {
    try {
        // Fetch all feedback from the database
        const feedbacks = await Feedback.find();

        res.status(200).json({
            message: "Feedbacks fetched successfully",
            error: false,
            success: true,
            data: feedbacks,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching feedbacks",
            error: true,
            success: false,
        });
    }
}

module.exports = getAllFeedbacksController;

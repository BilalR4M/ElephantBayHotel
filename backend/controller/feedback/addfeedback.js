const Feedback = require('../../model/Feedback');

async function addFeedbackController(req, res) {
    try {
        const {
            name,
            email,
            duration,
            howDidYouHear,
            quality,
            cleanliness,
            food,
            staff,
            suggestions,
            rating
        } = req.body;

        // Create a new instance of the Feedback model
        const newFeedback = new Feedback({
            name,
            email,
            duration,
            howDidYouHear,
            quality,
            cleanliness,
            food,
            staff,
            suggestions,
            rating
        });

        // Save the new feedback
        const savedFeedback = await newFeedback.save();

        res.status(201).json({
            message: "Feedback added successfully",
            error: false,
            success: true,
            data: savedFeedback,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: "Error adding feedback",
            error: true,
            success: false,
        });
    }
}

module.exports = addFeedbackController;

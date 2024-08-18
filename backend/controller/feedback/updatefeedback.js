const Feedback = require('../../model/Feedback');

class UpdateFeedbackController {
    async updateFeedback(req, res) {
        try {
            const feedback = await Feedback.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!feedback) {
                return res.status(404).json({ error: "Feedback not found" });
            }

            res.status(200).json({
                message: "Feedback updated successfully",
                error: false,
                success: true,
                data: feedback,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server Error",
                error: true,
                success: false,
            });
        }
    }
}

module.exports = new UpdateFeedbackController();

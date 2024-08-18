const emailMessageModel = require('../../model/emailMessageModel');
async function storesentMsgController(req, res) {
    try {
        const { email, firstName, subject, message } = req.body;

        // Create a new instance of the EmailMessage model
        const emailMessage = new emailMessageModel({
            email,
            firstName,
            subject,
            message
        });
        const saveEmail = await emailMessage.save();
    
        res.status(201).json({
            message: "Successfully sent email...!",
            error: false,
            success: true,
            data: saveEmail,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error saving email...!",
            error: true,
            success: false,
        });
    }
}
module.exports = storesentMsgController;

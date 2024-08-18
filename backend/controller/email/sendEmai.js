const EmailModel = require('../../model/emailmodel');

async function sendEmailController(req, res) {
    try {
        // Assuming req.body contains the necessary data for creating an email
        const sendEmail = new EmailModel(req.body);
        const saveEmail = await sendEmail.save();
    
        res.status(201).json({
            message: "Sent successfully!",
            error: false,
            success: true,
            data: saveEmail,
        });
    } catch (err) {
        res.status(400).json({
            message: "offers received!",
            error: true,
            success: false,
        });
    }
}

module.exports = sendEmailController;

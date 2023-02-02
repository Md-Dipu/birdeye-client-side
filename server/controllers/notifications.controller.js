const { createNotificationService } = require("../services/notifications.service");

exports.createNotificationController = async (req, res) => {
    try {
        const result = await createNotificationService(req.body);

        res.status(200).json({
            status: "success",
            message: "Notification inserted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't able to insert notification",
            error: error.message
        });
    }
};
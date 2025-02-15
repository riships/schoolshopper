import ErrorHandler from "../utils/errorHandler.js";
import Organization from "../models/organization.model.js"

export const addOrgDetails = async (req, res, next) => {
    try {
        const org = new Organization({ ...req.body, createdBy: req.user.userId });
        await org.save();
        res.status(201).json({ success: true, message: "Organization details added successfully" });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
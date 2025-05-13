import Vendor from "../models/vendor.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import fs from "fs";

export const createVendor = async (req, res, next) => {
    try {
        const requiredFields = [
            'vendor_name',
            'contact_person_name',
            'vendor_phone',
            'vendor_address',
            'vendor_city',
            'vendor_state',
            'vendor_country',
            'vendor_pin_code',
        ];
        const existingVendor = await Vendor.findOne({ vendor_email: req.body.vendor_email });
        const pan_card = req.files['pan_card']?.[0];
        const aadhar_card = req.files['aadhar_card']?.[0];
        const gst_certificate = req.files['gst_certificate']?.[0];
        const vendor = new Vendor({ ...req.body, vendor_pan_image: pan_card, vendor_aadhar_image: aadhar_card, vendor_gst_image: gst_certificate });
        if (existingVendor) {
            return next(new ErrorHandler("Vendor with this email already exists", 400));
        }
        for (const field of requiredFields) {
            if (!req.body[field]) {
                // check if field has value after _ it should be in camel case
                const fieldName = field
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                return next(new ErrorHandler(`Please provide ${fieldName}.`, 400));
            }
        }

        await vendor.save();
        res.status(201).json({ success: true, message: "Vendor created successfully", vendor });
    }
    catch (error) {
        const uploadedFiles = Object.values(req.files || {}).flat();
        for (const file of uploadedFiles) {
            try {
                await fs.unlink(file.path); // Deletes the file
            } catch (unlinkErr) {
                console.error(`Error deleting file: ${file.path}`, unlinkErr);
            }
        }
        next(new ErrorHandler(error.message, 500));
    }
}

export const getVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json({ success: true, vendors });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
export const getVendorById = async (req, res, next) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return next(new ErrorHandler("Vendor not found", 404));
        }
        res.status(200).json({ success: true, vendor });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
export const updateVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) {
            return next(new ErrorHandler("Vendor not found", 404));
        }
        res.status(200).json({ success: true, message: "Vendor updated successfully", vendor });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
export const deleteVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return next(new ErrorHandler("Vendor not found", 404));
        }
        res.status(200).json({ success: true, message: "Vendor deleted successfully" });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
export const getVendorByName = async (req, res, next) => {
    try {
        const vendor = await Vendor.findOne({ vendor_name: req.params.name });
        if (!vendor) {
            return next(new ErrorHandler("Vendor not found", 404));
        }
        res.status(200).json({ success: true, vendor });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
export const getVendorByEmail = async (req, res, next) => {
    try {
        const vendor = await Vendor.findOne({ vendor_email: req.params.email });
        if (!vendor) {
            return next(new ErrorHandler("Vendor not found", 404));
        }
        res.status(200).json({ success: true, vendor });
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


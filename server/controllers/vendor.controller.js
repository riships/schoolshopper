import Vendor from "../models/vendor.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createVendor = async (req, res, next) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.status(201).json(vendor);
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const getVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
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
        res.status(200).json(vendor);
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
        res.status(200).json(vendor);
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
        res.status(200).json({ message: "Vendor deleted successfully" });
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
        res.status(200).json(vendor);
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
        res.status(200).json(vendor);
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


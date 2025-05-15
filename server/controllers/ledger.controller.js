import Ledger from '../models/ledger.model.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createLedger = async (req, res, next) => {
    try {
        const ledger = new Ledger(req.body);
        await ledger.save();
        res.status(201).json(ledger);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating ledger', error });
    }
};

export const getLedgers = async (req, res, next) => {
    try {
        // add pagination here
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = req.query.filter || {};
        const search = req.query.search || '';
        // add aggregation here
        const ledgers = await Ledger.aggregate([
            { $match: filter },
            { $group: { _id: '$vendorId', totalAmount: { $sum: '$amount' } } },
            { $sort: { totalAmount: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]);
        res.status(200).json(ledgers);
    }
    catch (error) {
        return next(new ErrorHandler(error.message || 'Error fetching ledgers', 500));
    }
}

export const getLedgerById = async (req, res, next) => {
    try {
        const ledger = await Ledger.findById(req.params.id);
        if (!ledger) {
            return next(new ErrorHandler('Ledger not found', 404));
        }
        res.status(200).json(ledger);
    }
    catch (error) {
        return next(new ErrorHandler(error.message || 'Error fetching ledger', 500));
    }
}

export const getLedgersByVendorId = async (req, res, next) => {
    try {
        const ledgers = await Ledger.find({ vendorId: req.params.vendorId });
        if (!ledgers) {
            return next(new ErrorHandler('Ledgers not found', 404));
        }
        res.status(200).json(ledgers);
    }
    catch (error) {
        return next(new ErrorHandler(error.message || 'Error fetching ledgers', 500));
    }
}

export const updateLedger = async (req, res, next) => {
    try {
        const ledger = await Ledger.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ledger) {
            return next(new ErrorHandler('Ledger not found', 404));
        }
        res.status(200).json(ledger);
    }
    catch (error) {
        return next(new ErrorHandler(error.message || 'Error updating ledger', 500));
    }
}


export const deleteLedger = async (req, res, next) => {
    try {
        const ledger = await Ledger.findByIdAndDelete(req.params.id);
        if (!ledger) {
            return next(new ErrorHandler('Ledger not found', 404));
        }
        res.status(200).json({ message: 'Ledger deleted successfully' });
    }
    catch (error) {
        return next(new ErrorHandler(error.message || 'Error deleting ledger', 500));
    }
}

export const getLedgerByFilter = async (req, res, next) => {
    try {
        // add filter logic here and it should be dynamic based on the query params and we can add as many filters as we want write code down 
        const { vendorId, startDate, endDate, amount, credit, debit } = filter;
        const filter = {};
        if (vendorId) {
            filter.vendorId = vendorId;
        }
        if (startDate) {
            filter.startDate = { $gte: new Date(startDate) };
        }
        if (endDate) {
            filter.endDate = { $lte: new Date(endDate) };
        }
        if (amount) {
            filter.amount = amount;
        }
        if (credit) {
            filter.credit = credit;
        }
        if (debit) {
            filter.debit = debit;
        }


        const ledgers = await Ledger.find(filter);
        if (!ledgers) {
            return next(new ErrorHandler('Ledgers not found', 404));
        }
        res.status(200).json(ledgers);
    }
    catch (error) {
        return next(new ErrorHandler(error.message || 'Error fetching ledgers', 500));
    }
}




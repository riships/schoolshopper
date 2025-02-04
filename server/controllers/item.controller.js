import Item from "../models/item.model.js";
import ErrorHandler from '../utils/errorHandler.js';
import StockAdjustment from "../models/stockAdjustment.model.js";
import User from "../models/users.model.js";


export const createItem = async (req, res, next) => {
    try {
        const item_images = req.files.map((file) => "/" + file.destination + file.filename);
        const item = new Item({
            item_name: req.body.item_name,
            item_price: Number(req.body.item_price) || 0,
            item_description: req.body.item_description?.trim(),
            item_image: item_images,  // Assuming item_images is an array of image paths
            item_category: req.body.item_category?.trim(),
            item_stock: Number(req.body.item_stock) || 0,
            item_status: req.body.item_status?.trim(),
            item_rating: Number(req.body.item_rating) || 0,
            createdBy: req.user.userId, // Assuming req.user.userId is available
        });
        const data = await item.save();
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

export const itemsByGroup = async (req, res, next) => {
    try {
        const itemsData = await Item.aggregate([
            {
                $group: {
                    _id: "$category",  // Grouping by category
                    itemsData: { $push: "$$ROOT" } // Pushing entire item documents into an array
                }
            }
        ]);

        let data = itemsData[0].itemsData
        res.status(200).send({ success: true, data })
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

export const getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json({ success: true, items });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.status(200).json({ success: true, item })
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const updateItem = async (req, res, next) => {
    try {
        let item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({ success: true, item });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        let item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.status(200).json({ success: true, msg: 'Item deleted' });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


export const adjustStock = async (req, res, next) => {
    try {
        const {
            itemId,
            adjustMent_type,
            reason,
            quantity,
            remark
        } = req.body;
        const { userId } = req.user;
        const item = await Item.findById(itemId);

        const adjustedStock = new StockAdjustment({
            item: itemId,
            adjustMent_type,
            quantity,
            reason,
            remark,
            adjustedBy: userId
        });
        await adjustedStock.save();
        item.item_stock = quantity;
        await item.save();
        res.status(201).json({ success: false, message: "Stock adjusted successfully" })
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


// export const lowStock = async (req, res, next) => {
//     try {
//         const 
//     } catch (error) {
        
//     }
// }

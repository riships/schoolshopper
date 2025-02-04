import Item from "../models/item.model.js";
import ErrorHandler from '../utils/errorHandler.js';
import StockAdjustment from "../models/stockAdjustment.model.js";


export const createItem = async (req, res, next) => {
    try {
        const item_images = [];
        req.files.map((file) => (
            item_images.push('/' + file.destination + file.filename)
        ));

        const {
            item_name,
            item_price,
            item_description,
            item_category,
            item_status,
            item_stock,
            item_rating
        } = req.body;


        const item = new Item({
            item_name,
            item_price,
            item_description,
            item_image: item_images,
            item_category,
            item_stock,
            item_status,
            item_rating,
            createdBy: req.user.userId,
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
        const { productId } = req.params;
        const { userId } = req.user;
        const {
            item_name,
            adjustMent_type,
            reason,
            quantity
        } = req.body;

        console.log(productId);
        console.log(userId);


    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

const ob = {

}

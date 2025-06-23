import Item from "../models/item.model.js";
import ErrorHandler from '../utils/errorHandler.js';
import StockAdjustment from "../models/stockAdjustment.model.js";
import Category from "../models/category.model.js";



export const createItem = async (req, res, next) => {
    try {
        const item = new Item({
            ...req.body,
            item_name: req.body.item_name,
            item_price: Number(req.body.item_price) || 0,
            item_description: req.body.item_description?.trim(),
            item_images: req.files,
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
                    _id: "$category",
                    itemsData: { $push: "$$ROOT" }
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
        const fullUrl = req.protocol + '://' + req.get('host') + "/";
        const items = await Item.find().lean();;
        const updatedItems = items.map(item => {
            const files = item.item_images.map(file => ({
                url: `${fullUrl}${file.destination}${file.filename}`,
                filename: file.filename
            }));

            return {
                ...item,
                item_images: files
            };
        });

        res.status(200).json({ success: true, items: updatedItems });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById({ _id: req.params.id });
        if (!item) {
            return next(new ErrorHandler('Item not found', 404));
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
            return next(new ErrorHandler('Item not found', 404));
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
            return next(new ErrorHandler('Item not found', 404));
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


export const lowStock = async (req, res, next) => {
    try {
        const lowStockItems = await Item.find({ item_stock: { $gt: 0, $lte: 5 } });
        if (lowStockItems.length === 0 || !lowStockItems) {
            return next(new ErrorHandler('Not Item Found', 404));
        }
        res.status(200).json(lowStockItems);
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const outOfStock = async (req, res, next) => {
    try {
        const lowStockItems = await Item.find({ item_stock: { $lte: 0 } });
        if (lowStockItems.length === 0 || !lowStockItems) {
            return next(new ErrorHandler('Not Item Found', 404));
        }
        res.status(200).json(lowStockItems);
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const addCategories = async (req, res, next) => {
    try {
        const { category_name, sub_categories } = req.body;
        const { userId } = req.user;
        const categoryExist = await Category.find({ name: category_name });
        if (categoryExist.length > 0) {
            return next(new ErrorHandler('Category already exists', 400));
        }
        const newCategory = new Category({
            category_name,
            sub_categories,
            createBy: userId,
        });
        await newCategory.save();
        res.status(201).json({ success: true, message: "Category added successfully" })
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().select('-sub_categories');
        let sub_categories = await Category.find().select('sub_categories');
        sub_categories = sub_categories.map((sub_categorie) => {
            return { [sub_categorie._id.toString()]: sub_categorie.sub_categories };
        })

        res.status(200).json({ success: true, categories, sub_categories });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

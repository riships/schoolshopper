import Menu from "../models/menus.mode.js";
import subMenu from "../models/subMenus.model.js";
import ErrorHandler from '../utils/errorHandler.js';

export const addMenu = async (req, res, next) => {
    try {
        const menu = new Menu({ ...req.body });
        await menu.save();
        res.status(201).json({ success: true, message: "Menu added successfully" });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const deleteMenu = async (req, res, next) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Menu deleted successfully" });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const getMenus = async (req, res, next) => {
    try {
        const menus = await Menu.find().populate('subMenu');
        res.status(200).json({ success: true, data: menus });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


export const updateMenu = async (req, res, next) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: menu });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


export const addSubMenus = async (req, res, next) => {
    try {
        const { menuId } = req.query;
        await Promise.all(req.body.map(async (item) => {
            const sub_menus = new subMenu({ ...item });
            await sub_menus.save();

            await Menu.findByIdAndUpdate(menuId, {
                $push: { subMenu: sub_menus._id }
            });
        }));

        res.status(201).json({ success: true, message: "Sub Menu added successfully" })
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const updateSubMenu = async (req, res, next) => {
    try {
        const subMenu = await subMenu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}



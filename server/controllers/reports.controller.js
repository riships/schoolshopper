import User from "../models/users.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import generateExcel from "../utils/excelFileGenerator.js";


export const getAllUserData = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        const header = ['Column 1', 'Column 2', 'Column 3'];
        const data = [
            ["Cell 1", "Cell 2", "Cell 3"],
            ["Cell 4", "Cell 5", "Cell 6"],
            ["Cell 7", "Cell 8", "Cell 9"]
        ];

        const workbook = await generateExcel(header, data);

        // Set Headers for File Download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=dynamic_data.xlsx'
        );

        // Write to Response Stream
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
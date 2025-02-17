import ExcelJS from 'exceljs';
const generateExcel = async (header, data) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "me";
    workbook.lastModifiedBy = "me";
    workbook.created = new Date();
    workbook.modified = new Date();

    const sheet = workbook.addWorksheet('Sheet1', {
        properties: {
            tabColor: { argb: "FFC0000" }
        },
        views: [{
            state: "frozen",
            xSplit: 1,
            ySplit: 1,
            topLeftCell: "B2",
            activeCell: "A4"
        }]
    });

    // Set Header
    sheet.columns = header.map(col => ({
        header: col,
        key: col.toLowerCase().replace(/\s+/g, ''),
        width: 20
    }));

    // Add Rows
    sheet.addRows(data);

    return workbook;
};


export default generateExcel;
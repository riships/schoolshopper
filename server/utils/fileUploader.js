import multer from "multer";
import fs from "fs";

// Create the uploads directory if it doesn't exist
const dir = 'public/uploads/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },

    filename: (req, file, cb) => {
        const fileExt = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${Date.now()}.${fileExt}`);
    }
});

const multiFileUploader = multer({ storage });

export default multiFileUploader;

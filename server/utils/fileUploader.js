import multer from "multer";

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

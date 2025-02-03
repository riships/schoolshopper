import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/uploads/');
    },

    filename: (req, res, cb) => {
        const fileExt = res.originalname.split('.').pop();
        cb(null, `${res.fieldname}-${Date.now()}.${fileExt}`);

    }
})

const multiFileUploader = multer({ storage });

export default multiFileUploader
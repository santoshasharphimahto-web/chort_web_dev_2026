import multer from 'multer';
import path from 'path';
import fs from 'node:fs';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // '.' lagane se ye aapke project ki root directory se path uthayega
    const uploadDir = './public/uploads/';
    
    // Agar folder nahi hai, toh ye forcefully folder bana dega
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = async (req, file, cb)=> {
        const filetypes =['image/jpeg', 'image/png', 'application/pdf'];
        if (filetypes.includes(file.mimetype)) {
            cb(null, true);
        }else{
            cb(new Error('Invalid file type. Only JPEG, PNG and PDF files are allowed.'),false);
        }
    }

 export const upload=multer({
    storage,
    fileLimiter: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
})
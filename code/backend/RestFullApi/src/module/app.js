import express from "express"
import Router from "./auth/auth.router.js"
import multer from 'multer'
import ApiResponse from "../common/utiles/res/api-respons.js";
import path from 'path'
import cookieParser from "cookie-parser";


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/auth",Router);
// uploading a file on the disk
//  const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     const ext=path.extname(file.originalname)
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext)
//   }
// })
// const upload=multer({
//     storage,
//     fileLimiter: {fileSize: 1024 * 1024 * 5},
//     fileFilter: function (req, file, cb) {
//         const filetypes =['image/jpeg', 'image/png', 'application/pdf'];
//         if (filetypes.includes(file.mimetype)) {
//             cb(null, true);
//         }else{
//             cb(new Error('Invalid file type. Only JPEG, PNG and PDF files are allowed.'),false);
//         }
// }});
// #handinling a multiple file with different field name
// app.post('/uploads',upload.fields([
//     {name: "avatar",maxCount: 1},
//     {name: "documents",maxCount: 5}
// ]),(req,res)=>{
//     console.log(req.files)
//     ApiResponse.ok(res,"upload succes full")
// })
// #handinling a file with diffrent field name 
//  app.post('/uploads',(req,res)=>{
//     upload.single('file')(req,res,(err)=>{
//         if(err?.code==='LIMIT_FILE_SIZE'){
//             return ApiResponse.badRequest(res,"File size is too large. Maximum allowed size is 5MB.")
//     }
//     },
//     res.send("File uploaded successfully")
// )

//  })
export default app
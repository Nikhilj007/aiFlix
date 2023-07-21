import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import dotenv from 'dotenv';
import { saveVideo, getVideo,getVideoData, updateVideo } from './controllers/videos.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { nanoid } from 'nanoid';
import cors from 'cors';
dotenv.config();


const __filename = fileURLToPath(import.meta.url); //grab the file url
const __dirname = path.dirname(__filename); 

const app = express();
app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        req.nano= nanoid(10);
        return cb(null,`${req.nano}.mp4`)
    }
})

const upload = multer({storage:storage});
app.use(express.urlencoded({extended:false}));

app.get("/trailers/:filename",(req,res)=>{
    const dir = path.join(__dirname,'uploads');
    getVideo(req,res,dir);
}); 
app.get("/trailers",getVideoData);
app.post("/upload",upload.single('video'),saveVideo); 
app.get("/",(req,res)=>{
    res.send("hello world");
})
app.patch("/update",updateVideo);

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server started at ${process.env.PORT || 5000}`)
})
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to db");
}).catch((err)=>{console.log(err)})
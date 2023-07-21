import Video from '../models/videos.js';
import fs from 'fs';
import path from 'path';


export const getVideo = async (req, res,dir) => { 
    const filename = req.params.filename;
  const videoPath = path.join(dir, filename);

  // Check if the file exists
  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Video file not found:', err);
      return res.status(404).send('Video file not found');
    }

    // Set appropriate content type for the video
    res.setHeader('Content-Type', 'video/mp4');

    // Stream the video to the client
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
  });
}

export const getVideoData = async (req, res) => {
    try{
        const post = await Video.find();
        res.status(200).json(post);
    } catch(err){
        res.status(404).json({message:err.message});
    }
}

export const updateVideo = async (req, res) => {
    let _id = req.body._id;
    Video.findByIdAndUpdate(_id,{
        likes:req.body.likes,
        dislikes:req.body.dislikes,
        comments:req.body.comments
    }).then(()=>{res.send('post updated')})
    .catch((err)=>{console.log(err)})
}

export const saveVideo = async (req, res) => {
    const path = `${req.nano}.mp4`
    const likes = 0;
    const dislikes = 0;
    const comments = [];
    const title = req.body.title;
    const description = req.body.description;
    await Video.create({
        path,
        likes,
        dislikes,
        comments,
        title,
        description
    })
    .then(()=>{res.send("File uploaded successfully")})
    .catch((err)=>{
        console.log(err);
        res.status(500).send("Error uploading file");
    })
    
}
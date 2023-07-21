import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    path: String,
    likes: Number,
    dislikes: Number,
    comments: Array,
    title: String,
    description: String,
},{  timestamps:true }
)

const Video = mongoose.model("trailer",videoSchema);
export default Video;
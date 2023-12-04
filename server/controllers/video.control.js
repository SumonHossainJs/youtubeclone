import User from '../models/user.model.js';
import Video from '../models/video.model.js';
import { createError } from '../error.js';


export const addVideo = async (req,res,next) =>{
    const newVideo = new Video({userId:req.user.id, ...req.body});
    try{
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    }catch(err){
        next(err);
    }
}
export const deleteVideo = async (req,res,next) =>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, "Video not found"));
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json('The Video has been deleted');
        }else{
            return next(createError(404, "You can delete only your video"));
        }

    }catch(err){
        next(err);
    }
}
export const updateVideo = async (req,res,next) =>{

    const video = await Video.findById(req.params.id);
    if(!video) return next(createError(404, "The requested Video not Found"));
    try{

        if(req.user.id === video.userId){
           const updatedVideo =  await Video.findByIdAndUpdate(req.params.id, {
                $set:req.body, 
            },{new: true});

            res.status(200).json(updateVideo);
        }else{
            return next(createError(404,"You can only delete your video"));
        }

    }catch(err){
        next(err);
    }
}
export const getVideo = async (req,res,next) =>{
    try{
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    }catch(err){
        next(err);
    }
}
export const addView = async (req,res,next) =>{
    try{

    const viewAddedVideo = await Video.findByIdAndUpdate(req.params.id, {$inc:{views:1}});

    res.status(200).json(viewAddedVideo);

    }catch(err){
        next(err);
    }
}
export const randomVideo = async (req,res,next) =>{
    try{
        const videos =await Video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}
export const trend = async (req,res,next) =>{
    try{
        const trendiVideos = await Video.find().sort({views: -1});
        res.status(200).json(trendiVideos);

    }catch(err){
        next(err);
    }
}
export const sub = async (req,res,next) =>{
    try{
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUser;

        const list = await Promise.all( subscribedChannels.map(async(channelId) => {
            return await Video.find({userId:channelId});
        }))
        res.status(200).json(list.flat().sort((a,b) => b.createdAt - a.createdAt));

    }catch(err){
        next(err);
    }
}
export const myVideo = async (req,res,next) =>{
    try{
        const myvideo = await Video.find({userId: req.user.id});
        res.status(200).json(myvideo);
    }catch(err){
        next(err);
    }
}

export const getbyTag = async (req,res,next) =>{
    try{

        const tags = req.query.tags.split(",");

        const TagVideos = await Video.find({tags: {$in:tags}}).limit(20);
        res.status(200).json(TagVideos);

    }catch(err){
        next(err);
    }
}
export const search = async (req,res,next) =>{
    const query = req.query.q;
    try{

        const searchVideo = await Video.find({title:{$regex:query, $option:'i'}}).limit(20);

        res.status(200).json(searchVideo);

    }catch(err){
        next(err);
    }
}



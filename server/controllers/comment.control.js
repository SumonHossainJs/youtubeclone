import Comment from '../models/comment.model.js';
import Video from '../models/video.model.js';
import { createError } from '../error.js';


export const addComment = async (req,res,next) =>{
    const newComment = new Comment({...req.body, userId:req.user.id});
    try{
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
    }catch(err){
        next(err);
    }}


export const getComment = async (req,res,next) =>{
    console.log(req.params.id);
    try{
        const Comments = await Comment.find({videoId:req.params.id});
        res.status(200).json(Comments);
    
    }catch(err){
        next(err);
    }}

    
export const updateComment = async (req,res,next) =>{
    try{

        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);

        if(req.user.id === comment.userId || req.user.id === video.userId){

            await Comment.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("the comment has been updated successfully");

        }else{
            return next(createError(404, "You can only update your comment"));
        }
    
    }catch(err){
        next(err);
    }}
export const deleteComment = async (req,res,next) =>{
    try{

        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);

        if(req.user.id === comment.userId || req.user.id === video.userId){

            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("the comment has been deleted successfully");

        }else{
            return next(createError(404, "You can only delete your comment"));
        }
    
    }catch(err){
        next(err);
    }}
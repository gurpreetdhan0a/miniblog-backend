import PostSchema from '../model/postSchema.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postSchema = await PostSchema.find();
        res.status(200).json(postSchema);
    } catch (error) {
        res.send("Fields not found")
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost  = new PostSchema(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error})
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostSchema.findByIdAndRemove(id);
    res.json({message:"Post has been deleted"})
}

export const likePost = async (req, res) => {
    const {id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostSchema.findById(id);
    const updatedPost = await PostSchema.findByIdAndUpdate(id, {likeCount : post.likeCount + 1}, {new:true});
    res.json(updatedPost);
}

export const unLikePost = async (req, res) => {
    const {id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostSchema.findById(id);
    const updatedPost = await PostSchema.findByIdAndUpdate(id, {likeCount : post.likeCount - 1}, {new:true});
    res.json(updatedPost);
}
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title : String,
    selectedFile : String,
    message : String,
    tags : [String],
    likeCount : {type:Number , default : 0},
    userId : String,
    username : String,
    createdAt : {
        type:Date,
        default : new Date().toGMTString()
    }
});

const PostSchema = mongoose.model('PostSchema', postSchema);

export default PostSchema;
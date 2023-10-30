import {model, Schema} from "mongoose";

const postSchema = new Schema({

   title: {
       type: "string",
       required: [true, 'Post must have a title']
   },
    PostBody: {
       type: "string",
        required: [true, 'Post must have a body']
    }

})

const Post = model('Post', postSchema)

export default Post
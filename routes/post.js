import express from 'express';
import {createPost, deletePost, getAllPost, getSinglePost, updatePost} from "../controllers/postController";

const router = express.Router();

console.log('here')
router.route('/posts').get(getAllPost).post(createPost);
router.route('/posts/:id').get(getSinglePost).put(updatePost).delete(deletePost)

export default router;

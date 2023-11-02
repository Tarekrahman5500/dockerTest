import express from 'express';
import {createPost, deletePost, getAllPost, getSinglePost, updatePost} from "../controllers/postController";
import {cacheAllPosts, getSinglePostFromRedis, updatePostCache} from "../controllers/redisMiddleware";
import {protect} from "../middleWare/authMiddleWare";

const router = express.Router();

console.log('here')
router.route('/posts').get(protect, cacheAllPosts, getAllPost).post(protect, updatePostCache, createPost);
router.route('/posts/:id').get(getSinglePostFromRedis, updatePostCache, getSinglePost).put(updatePostCache, updatePost).delete(updatePostCache, deletePost)

export default router;

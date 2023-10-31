import express from 'express';
import {createPost, deletePost, getAllPost, getSinglePost, updatePost} from "../controllers/postController";
import {cacheAllPosts, getSinglePostFromRedis, updatePostCache} from "../controllers/redisMiddleware";

const router = express.Router();

console.log('here')
router.route('/posts').get(cacheAllPosts, getAllPost).post(updatePostCache, createPost);
router.route('/posts/:id').get(getSinglePostFromRedis, getSinglePost).put(updatePostCache, updatePost).delete(updatePostCache, deletePost)

export default router;

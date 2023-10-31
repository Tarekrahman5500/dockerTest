import Post from "../models/postModel";
import catchAsyncErrors from "../helpers/catchAsyncErrors";
import redis from '../config/redis';

export const getAllPost = catchAsyncErrors(async (req, res, next) => {
    console.log('posts')
    const redisKey = 'all_posts';


    const posts = await Post.find()
    redis.set(redisKey, JSON.stringify(posts), 'EX', 3600);
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts
        }
    })


})

// Create a route for fetching a single post
export const getSinglePost = catchAsyncErrors(async (req, res, next) => {

    // Get the post ID from the request parameters
    const postId = req.params.id;

    // Find the post by its ID
    const post = await Post.findById(postId);

    /* // Check if the post exists
     if (!post) {
         return res.status(404).json({
             status: 'error',
             message: 'Post not found',
         });
     }*/

    // If the post exists, return it in the response
    res.status(200).json({
        status: 'success',
        data: {
            post,
        },
    });

});

// Create a route for creating a new post
export const createPost = catchAsyncErrors(async (req, res, next) => {

    // Extract post data from the request body
    const {title, PostBody} = req.body;

    // Create a new post instance
    const newPost = new Post({
        title,
        PostBody,
    });

    // Save the new post to the database
    await newPost.save();

    // Respond with a success message and the created post
    res.status(201).json({
        status: 'success',
        message: 'Post created successfully',
        data: {
            post: newPost,
        },
    });

});

// Create a route for updating a post
export const updatePost = catchAsyncErrors(async (req, res, next) => {

    // Get the post ID from the request parameters
    const postId = req.params.id;

    // Extract updated post data from the request body
    const {title, PostBody} = req.body;

    // Find the post by its ID
    const post = await Post.findById(postId);

    // Check if the post exists
    /*if (!post) {
        return res.status(404).json({
            status: 'error',
            message: 'Post not found',
        });
    }*/

    // Update the post with the new data
    post.title = title;
    post.PostBody = PostBody;

    // Save the updated post
    await post.save();

    // Respond with a success message and the updated post
    req.message = ({
        status: 'success',
        message: 'Post updated successfully',
        data: {
            post,
        },
    });
    return message

});

// Create a route for deleting a post
export const deletePost = catchAsyncErrors(async (req, res, next) => {

    // Get the post ID from the request parameters
    const postId = req.params.id;

    // Find the post by its ID
    await Post.findByIdAndDelete(postId);

    // Check if the post exists
    /*   if (!post) {
           return res.status(404).json({
               status: 'error',
               message: 'Post not found',
           });
       }*/

    // Delete the post from the database
    //   await post.remove();

    // Respond with a success message
    return req.message({
        status: 'success',
        message: 'Post remove successfully',
    }); // 204 No Content status indicates successful deletion

});
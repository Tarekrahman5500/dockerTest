import redis from '../config/redis';
import Post from "../models/postModel";
// Middleware to cache and retrieve all posts
const redisKey = 'all_posts';
export const cacheAllPosts = async (req, res, next) => {


    // Check if the data is available in Redis
    const cachedData = await redis.get(redisKey);
    console.log(cachedData)

    if (cachedData) {
        // If data is found in Redis, return it to the client
        const posts = JSON.parse(cachedData);
        res.status(200).json({
            status: 'success in cache',
            results: posts.length,
            data: {
                posts,
            },
        });
    } else {
        next()
        //  redis.set(redisKey, JSON.stringify(posts), 'EX', 3600);

        /*  // Return the data to the client
          res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
              posts,
            },
          });
        }*/
    }
}

// Middleware to update cache after creating, updating, or deleting posts
export const updatePostCache = async (req, res, next) => {
    // Perform the create, update, or delete operation
    await next();

    // After the operation, update the cache
    const redisKey = 'all_posts';
    const posts = await Post.find();
    redis.set(redisKey, JSON.stringify(posts), 'EX', 3600);
};


// Middleware to fetch a single post by ID
export const getSinglePostFromRedis = async (req, res, next) => {
    const postId = req.params.id;

    // const redisKey = `post:${postId}`;

    // Check if the data is available in Redis
    const cachedData = await redis.get(redisKey);
    console.log(cachedData)
    const cachedObjects = JSON.parse(cachedData);

// Search for a matching object based on postId
    const matchedObject = cachedObjects.find((obj) => obj._id === postId);
    console.log(matchedObject)
    if (matchedObject) {
        // If data is found in Redis, return it to the client
        const post = JSON.parse(cachedData);
        res.status(201).json({
            status: 'success from cache',
            data: {
                post,
            },
        });
    } else {
        // If data is not found in Redis, call next() to proceed to getSinglePost
        console.log('original data')
        next();
    }
};

/*// Apply the middleware to the relevant routes
app.get('/posts', cacheAllPosts);
app.post('/posts', updatePostCache, createPost);
app.get('/posts/:id', getSinglePost);
app.put('/posts/:id', updatePostCache, updatePost);
app.delete('/posts/:id', updatePostCache, deletePost);*/

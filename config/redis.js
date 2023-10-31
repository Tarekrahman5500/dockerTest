// redis.js
import Redis from 'ioredis';
import {config} from "./config";

const redis = new Redis({
    host: config.REDIS_URL,
    port: config.REDIS_PORT
});



export default redis;

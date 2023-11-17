import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import logger from 'morgan'
import cookieParser from "cookie-parser";
import * as path from "path";
import mongoose from "mongoose";

import redis from "redis"
import session from 'express-session';
import connectRedis from 'connect-redis';


import {config} from './config/config'
import usersRouter from './routes/users';
import router from "./routes";

import errorHandler from "./helpers/error";

import postRouter from "./routes/post"
import ErrorHandler from "./helpers/errorhander";



//console.log(config)
const app = express();

const mongoURL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`


const connectWIthReTry = () => {
    mongoose.connect(mongoURL, {
        useUnifiedTopology: true,


    })
        .then(() => console.log("connection established"))
        .catch((err) => {
            console.error(err)
          //  setTimeout(connectWIthReTry, 5000)
        })
}

 connectWIthReTry()
const port = process.env.PORT || 5000
app.enable("trust proxy")
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.get('/api/v1', (req, res, next) => {
    console.log('test1')
    res.send(`<h1>hi</h1>`)
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/post', postRouter);

app.use((req, res, next) => {
    next(new ErrorHandler( `path: ${req.originalUrl} not found`, 404))
})
app.use(errorHandler)

app.listen(port, () => {
    //   console.log(`${api}/products`)
    console.log(`app listening on port on the ${port}`)
})

module.exports = app;

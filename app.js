import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import logger from 'morgan'
import cookieParser from "cookie-parser";
import * as path from "path";

import indexRouter  from './routes';
import  usersRouter  from './routes/users';
import router from "./routes";

const app = express();

const port = process.env.PORT || 5000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res, next) => {
  res.send(`<h1>hi</h1>`)
});

app.use('/users', usersRouter);

app.listen(port, () => {
    //   console.log(`${api}/products`)
    console.log(`app listening on port  ${port}`)
})

module.exports = app;

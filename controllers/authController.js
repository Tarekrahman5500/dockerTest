

import userModel from "../models/userModel";
import catchAsyncErrors from "../helpers/catchAsyncErrors";
import User from "../models/userModel";
import * as argon2 from "argon2";

export  const signUp = catchAsyncErrors(async (req, res, next) => {

    //const password = req.body.password
   // const hash =
     req.body.password = await argon2.hash(req.body.password);
   const newUser = await  User.create(req.body)

     res.status(201).json({
            status: 'success',
            message: 'user created successfully',
            data: {
                user: newUser,
            },
        });

})
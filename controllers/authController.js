import userModel from "../models/userModel";
import catchAsyncErrors from "../helpers/catchAsyncErrors";
import User from "../models/userModel";
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken'

export const signUp = catchAsyncErrors(async (req, res, next) => {

    //const password = req.body.password
    // const hash =
    req.body.password = await argon2.hash(req.body.password);
    const newUser = await User.create(req.body)

    res.status(201).json({
        status: 'success',
        message: 'user created successfully',
        data: {
            user: newUser,
        },
    });

})

// Create a login route
export const login = catchAsyncErrors(async (req, res, next) => {
    const {username, password} = req.body;


    const user = await User.findOne({username});
     if (!user) {
        return next(new Error('user not found'));
    }

    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
        return next(new Error('Invalid password credentials'));
    }


    // If the email and password are correct, generate a JWT
    const token = jwt.sign({userId: user._id, username, password}, 'your-secret-key', {
        expiresIn: '1h', // Set the token expiration time
    });

       // Set a cookie with the JWT token
    res.cookie('jwt', token, {
        httpOnly: true, // Ensures the cookie is only accessible through HTTP requests
        maxAge: 3600000, // Set the expiration time for the cookie (1 hour in milliseconds)
        secure: true,

    });

    // Send the JWT token in the response
    return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        token,
    });
});
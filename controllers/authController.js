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

    // Check if the email and password are provided
    /*  if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email and password are required.',
        });
      }*/

    // Find the user by their email
    const user = await User.findOne({username});
     if (!user) {
        return next(new Error('user not found'));
    }
    // Check if the user exists
    /*  if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials. User not found.',
        });
      }*/

    // Verify the password using Argon2
    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
        return next(new Error('Invalid password credentials'));
    }

    // If the email and password are correct, generate a JWT
    const token = jwt.sign({userId: user._id}, 'your-secret-key', {
        expiresIn: '1h', // Set the token expiration time
    });

    // Send the JWT token in the response
    return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        token,
    });
});
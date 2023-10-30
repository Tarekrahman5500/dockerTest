import {model, Schema} from "mongoose";

const userSchema = new Schema({

   username: {
       type: "string",
       required: [true, 'name must have a title'],
       unique: true,
   },
    password: {
       type: "string",
        required: [true, 'Password must have a body']
    }

})

const User = model('User', userSchema)

export default User
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },

    Email:{
        type: String,
        required:true,
        unique:true
    },

    Password:{
        type:String,
        required:true
    },

    Date:{
        type:Date,
        default:Date.now()
    }
});

export default mongoose.model("User",UserSchema);

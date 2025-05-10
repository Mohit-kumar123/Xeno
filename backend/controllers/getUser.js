import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const fetchUser = async(req,res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Error! While Fetching User...",
        })
    }
};
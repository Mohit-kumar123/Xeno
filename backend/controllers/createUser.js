import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req,res) =>{
    try {
        const {Name,Email, Password} = req.body;
        let user = await User.findOne({Email});
        if(user){
            return res.status(200)
            .json({
                success:false,
                message:"User Already Exists"
            });
        }

        user = new User({Name, Email, Password});

        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(Password,salt);

        await user.save();
        const payload = {user:
            {id:user.id}
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:3600
            },
            (err,token) =>{
                if(err) throw err;
                res.json({token});
            }
        );

    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Error! While Registering..."
        })
    }
};

export const login = async(req,res) =>{
    const {Email, Password} = req.body;
    try {
        let user = await User.findOne({Email});
        if(!user){
            return res.status(400)
            .json({
                success:false,
                message:"Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(Password,user.Password);
        if(!isMatch){
            return res.status(400)
            .json({
                success:false,
                message:"Invalid Creddentials"
            });
        }

        const payload = {user:{
            id:user.id
        }};

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:3600
            },
            (err,token) =>{
                if(err) throw err;
                res.json({
                    token
                });
            }
        );
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Error! While Login..."
        })
    };

}
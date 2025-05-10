import jwt from 'jsonwebtoken';

export const auth = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400)
        .json({
            success:false,
            message:"No Token, Authorization Denied"
        });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Token is not Valid",
        })
    }
}
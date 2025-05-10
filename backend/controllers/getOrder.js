import {Customer} from '../models/CustomerSchema.js';
import {Order} from '../models/OrderSchema.js';

export const fetchOrder = async(req,res) => {
    try {
        const order = await Order.find().populate('CustomerId');
        res.status(200)
        .json({
            success:true,
            response:order,
            message:"Order Fetched Successfully...",
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Error! While Fetching Order...",
        })
    }
};
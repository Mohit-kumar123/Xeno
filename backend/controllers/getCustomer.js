import {Customer} from '../models/CustomerSchema.js';
import {Order} from '../models/OrderSchema.js';

export const fetchCustomer = async(req,res) => {
    try {
        const customer = await Customer.find();
        res.status(200)
        .json({
            success:true,
            response:customer,
            message:"Customer Fetched Successfully..."
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Error! While Fetching Customer..."
        })
    }
}
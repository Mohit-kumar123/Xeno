import {Customer} from '../models/CustomerSchema.js';
import {Order} from '../models/OrderSchema.js';

export const newCustomer = async(req,res) => {
    try {
        const {CustomerName, CustomerEmail, CustomerContact} = req.body;
        await Customer.create({CustomerName, CustomerEmail, CustomerContact});
        res.status(200)
        .json({
            success: true,
            message: "Customer Registered Successfully..."
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Error! While Registering Customer..."
        })
    }
};



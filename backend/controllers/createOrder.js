import {Customer} from '../models/CustomerSchema.js';
import {Order} from '../models/OrderSchema.js';

export const newOrder = async(req,res) =>{
    try {
        const {CustomerId, AmountSpend} = req.body;
        let order = new Order({CustomerId, AmountSpend});
        order.TotalOrders += 1;
        order.LastestOrder = Date.now();
        await order.save();

        let customer = await Customer.findById(CustomerId);
        customer.CustomerSpends += AmountSpend;
        customer.CustomerVisitsCount += 1;
        customer.CustomerLatestVisit = Date.now();
        await customer.save();

        res.status(200)
        .json({
            success:true,
            message:"Order Registered Successfully..."
        })

    } catch (error) {
        res.status(500)
        .json({
            success:false,
            message:"Error! While Registering Order..."
        })
    }
};

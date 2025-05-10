import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    CustomerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true,
    },

    TotalOrders:{
        type:Number,
        default:0
    },

    LastestOrder:{
        type:Date,
    },
    
    AmountSpend:{
        type: Number,
        default:0
    },

    Date:{
        type:Date,
        default:Date.now()
    }
});

export const Order = mongoose.model('Order',OrderSchema);
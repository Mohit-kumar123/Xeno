import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    CustomerName:{
        type:String,
        required:true
    },

    CustomerEmail:{
        type:String,
        required:true,
        unique:true
    },

    CustomerContact:{
        type:Number,
        required:true,
        unique:true,
        maxlength:10,
    },

    CustomerVisitsCount:{
        type:Number,
        default:0
    },

    CustomerLatestVisit:{
        type:Date
    },

    CustomerSpends:{
        type:Number,
        default:0
    },

    Date:{
        type:Date,
        default:Date.now()
    }
});

export const Customer = mongoose.model("Customer",CustomerSchema);
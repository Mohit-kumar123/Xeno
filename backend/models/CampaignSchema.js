import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
    UserName:{
        type: String,
        required: true
    },

    Audience:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }],

    CurrentStatus:{
        type:String,
        default:'Pending'
    },

    date:{
        type:Date,
        default:Date.now()
    },
})

export const Campaign = mongoose.model("Campaign",CampaignSchema);
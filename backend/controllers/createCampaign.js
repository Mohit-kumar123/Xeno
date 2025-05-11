import {Campaign} from '../models/CampaignSchema.js';
import {Customer} from '../models/CustomerSchema.js';

export const createCampaign = async (req, res) => {
  try {
    const { UserName, Audience, CurrentStatus } = req.body;

    // console.log('Request Body:', req.body);

    const newCampaign = new Campaign({
      UserName,
      Audience,
      CurrentStatus,
    });

    // console.log('New Campaign:', newCampaign);

    await newCampaign.save();

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: newCampaign,
    });
  } catch (error) {
    console.error('Error creating campaign:', error.message, error.stack);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    // console.log('Fetching campaigns...');
    const campaigns = await Campaign.find().populate('Audience');
    // console.log('Campaigns fetched:', campaigns);
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error.message, error.stack);
    res.status(500).json({ message: 'Server Error' });
  }
};

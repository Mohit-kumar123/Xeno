import {Campaign} from '../models/CampaignSchema.js';
import {Customer} from '../models/CustomerSchema.js';

export const createCampaign = async (req, res) => {
  try {
    const { UserName, Audience, CurrentStatus } = req.body;

    console.log('Request Body:', req.body);

    const newCampaign = new Campaign({
      UserName,
      Audience,
      CurrentStatus,
    });

    console.log('New Campaign:', newCampaign);

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
    const campaigns = await Campaign.find().populate('audience');
    res.json(campaigns);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

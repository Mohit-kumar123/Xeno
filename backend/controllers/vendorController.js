import { Campaign } from '../models/CampaignSchema.js';
import axios from 'axios';

export const sendCampaign = async (req, res) => {
  const { campaignId } = req.body; // Extract campaignId from the request body
  // console.log('Request Body:', req.body); // Log the request body for debugging
  // console.log('Campaign ID:', campaignId); // Log the campaignId for debugging

  try {
    if (!campaignId) {
      return res.status(400).json({ message: 'Campaign ID is required' });
    }

    const campaign = await Campaign.findById(campaignId).populate('Audience');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // console.log('Campaign found:', campaign);

    // Logic for sending the campaign
    res.json({ message: 'Campaign sent successfully' });
  } catch (error) {
    console.error('Error sending campaign:', error.message, error.stack);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const updateReceipt = async (req, res) => {
  const { campaignId, CustomerId, CurrentStatus } = req.body;
  try {
    // Find the campaign
    let campaign = await Campaign.findById(campaignId);

    // Check if the campaign exists
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Find the customer in the campaign's audience
    let customer = campaign.audience.find(c => c._id.toString() === CustomerId);

    if (customer) {
      // Update the customer's status
      customer.status = CurrentStatus;
      await campaign.save();
    }

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating receipt:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

import { Campaign } from '../models/CampaignSchema.js';
import axios from 'axios';

export const sendCampaign = async (req, res) => {
  const { campaignId } = req.body; // Extract campaignId from the request body
  try {
    console.log('Campaign ID:', campaignId); // Log the campaignId for debugging

    // Check if campaignId is undefined
    if (!campaignId) {
      return res.status(400).json({ message: 'Campaign ID is required' });
    }

    // Find the campaign and populate the Audience field
    let campaign = await Campaign.findById(campaignId).populate('Audience');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    console.log('Campaign found:', campaign);

    // Use the vendor API URL from the environment variables
    const vendorApiUrl = process.env.VENDOR_API_URL;

    // Iterate over the audience and send data to the vendor API
    const promises = campaign.Audience.map(async (customer) => {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      const payload = {
        recipientId: customer._id.toString(),
        messageContent: `Hello ${customer.CustomerName}, this is your campaign message!`,
        status: status,
        timeStamp: new Date().toISOString(),
      };

      console.log('Payload:', payload);

      try {
        await axios.post(vendorApiUrl, payload);
      } catch (err) {
        console.error('Error posting to vendor API:', err.message);
      }
    });

    // Wait for all requests to complete
    await Promise.all(promises);

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

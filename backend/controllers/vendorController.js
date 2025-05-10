import {Campaign} from '../models/CampaignSchema.js';
import axios from 'axios';

export const sendCampaign = async (req, res) => {
  const { campaignId } = req.body;
  try {
    let campaign = await Campaign.findById(campaignId).populate('audience');

    campaign.audience.forEach(async (customer) => {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      await axios.post('http://localhost:5000/api/vendor/receipt', {
        campaignId,
        CustomerId: customer._id,
        status,
      });
    });

    res.json({ message: 'Campaign sent' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const updateReceipt = async (req, res) => {
  const { campaignId, CustomerId, CurrentStatus } = req.body;
  try {
    let campaign = await Campaign.findById(campaignId);
    let customer = campaign.audience.find(c => c._id.toString() === CustomerId);

    if (customer) {
      customer.status = CurrentStatus;
      await campaign.save();
    }

    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

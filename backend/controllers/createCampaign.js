import {Campaign} from '../models/CampaignSchema.js';
import {Customer} from '../models/CustomerSchema.js';

export const createCampaign = async (req, res) => {
  const { CustomerName, criteria } = req.body;
  try {
    let query = {};
    if (criteria.CustomerSpends) query.CustomerSpends = { $gt: criteria.CustomerSpends };
    if (criteria.CustomerVisitsCount) query.CustomerVisitsCount = { $eq: criteria.CustomerVisitsCount };
    if (criteria.CustomerLatestVisit) query.CustomerLatestVisit = { $lt: criteria.CustomerLatestVisit };

    const audience = await Customer.find(query);
    const campaign = new Campaign({ CustomerName, audience: audience.map(c => c._id) });
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(500).send(error);
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

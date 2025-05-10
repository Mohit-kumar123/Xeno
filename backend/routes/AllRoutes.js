import express from 'express';
import passport from 'passport';
import {newCustomer} from '../controllers/createCustomer.js';
import {fetchCustomer} from '../controllers/getCustomer.js';
import {newOrder} from '../controllers/createOrder.js';
import {fetchOrder} from '../controllers/getOrder.js';
import { createCampaign, getCampaigns } from '../controllers/createCampaign.js';
import { sendCampaign, updateReceipt } from '../controllers/vendorController.js';


const MainRouter = express.Router();

MainRouter.get('/google',passport.authenticate('google',{scope:['profile']}));
MainRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});
MainRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
MainRouter.post('/createCustomer',newCustomer);
MainRouter.get('/getCustomer',fetchCustomer);
MainRouter.post('/createOrder',newOrder);
MainRouter.get('/getOrder',fetchOrder);
MainRouter.post('/createCampaign',createCampaign);
MainRouter.get('/getCamapign',getCampaigns);
MainRouter.post('/sendCamapign',sendCampaign);
MainRouter.post('/updateReceipt',updateReceipt);

export default MainRouter;
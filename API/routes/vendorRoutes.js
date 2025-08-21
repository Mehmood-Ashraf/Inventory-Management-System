import express, { Router } from 'express'
import { addVendor, deleteVendor, getAllVendors, getSingleVendor } from '../controllers/vendorControllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/add', addVendor) //add vendor
router.get('/all', getAllVendors) //getall Vendors
router.get('/:id', getSingleVendor) //get single vendor 
router.delete('/:id', deleteVendor) //delete vendor

export default router
import express, { Router } from 'express'
import { addVendor, deleteVendor, getAllVendors, getSingleVendor, updateVendor } from '../controllers/vendorControllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/add', verifyToken, addVendor) //add vendor
router.get('/all', verifyToken, getAllVendors) //getall Vendors
router.get('/:id', verifyToken, getSingleVendor) //get single vendor 
router.delete('/:id', verifyToken, deleteVendor) //delete vendor
router.put('/update/:id', verifyToken, updateVendor) //update Vendor

export default router
// import vendorModel from "../models/vendorModel"
import { errorHandler, successHandler } from "../utils/responseHandler.js"
import Vendor from '../models/vendorModel.js'

export const addVendor = async (req, res) => {
    const {vendorName, contact, address} = req.body
    console.log(req.body)

    if(!vendorName){
        return errorHandler(res, 500, "Missing Fields!")
    }

    const existingVendor = await Vendor.findOne({vendorName})
    if(existingVendor){
        return errorHandler(res, 500, "Vendor already Exist!!")
    }

    try {
        const newVendor = new Vendor({
        vendorName,
        contact,
        address,
        vendorBills : []
    });

    console.log("New Vendor", newVendor)

    const vendor = await newVendor.save()

    return successHandler(res, 200, "New Vendor Added", vendor)
    } catch (error) {
        console.log("error in addVendorController")
        return errorHandler(res, 500, error)
    }
}


export const getSingleVendor = async (req, res) => {
    try {
        const {id} = req.params

        const vendor = await Vendor.findById(id)
        if(!vendor){
            return errorHandler(res, 404, "Vendor not found")
        }

        return successHandler(res, 200, "Vendor fetched successfully", vendor)
    } catch (error) {
        return errorHandler(res, 500, error)
    }
}

export const getAllVendors = async (req, res) => {
    // console.log("Get all vendor chala")
    try {
        const vendors = await Vendor.find()

        if(!vendors || vendors.length === 0){
            return errorHandler(res, 404, "No vendors found")
        }

        return successHandler(res, 200, "Vendors fetched successfully", vendors)
    } catch (error) {
        console.log("Error in get all vendors", error)
        return errorHandler(res, 500, "Vendors Fetched Failed")
    }
}

export const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params

        const deletedVendor = await Vendor.findByIdAndDelete(id)
        if(!deletedVendor) {
            return errorHandler(res, 404, "Vendor not found")
        }

        return successHandler(res, 200, "Vendor Deleted successfully", deletedVendor)
    } catch (error) {
        return errorHandler(res, 500, "Something went wrong")
    }
}
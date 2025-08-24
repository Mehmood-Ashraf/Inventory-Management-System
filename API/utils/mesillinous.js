export const getSingleVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findById(id)
      .populate("bills")       // agar bills ka relation hai
      .populate("payments");   // agar payments ka relation hai

    if (!vendor) {
      return errorHandler(res, 404, "Vendor not found");
    }

    return successHandler(res, 200, "Vendor fetched successfully", vendor);
  } catch (error) {
    return errorHandler(res, 500, error.message || error);
  }
};






export const getAllVendors = async (req, res) => {
  try {
    let filters = {};
    if (req.query?.vendorName) {
      filters.vendorName = { $regex: new RegExp(req.query.vendorName, "i") }; // case-insensitive partial match
    }

    const vendors = await Vendor.find(filters)
      .select("vendorName email phone outstandingBalance createdAt"); // sirf ye fields bhejo

    if (!vendors || vendors.length === 0) {
      return errorHandler(res, 404, "No vendors found");
    }

    return successHandler(res, 200, "Vendors fetched successfully", vendors);
  } catch (error) {
    console.log("Error in get all vendors", error);
    return errorHandler(res, 500, "Vendors Fetched Failed");
  }
};

export const successHandler = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success : true,
        message,
        data
    })
}


export const errorHandler = (res, statusCode, error) => {
    return res.status(statusCode).json({
        success : false,
        message : error || "Something went wrong! Error in errorHandler"
    })
}
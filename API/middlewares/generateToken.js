import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    const id = {id : user._id}
    try {
        const token = jwt.sign(id, process.env.JWT_SECRET_KEY, { expiresIn : "1d" })
        return token
    } catch (error) {
        console.log("JWT Error", error)
        return null
    }
}
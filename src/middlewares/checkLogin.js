import jwt from "jsonwebtoken"
import errorResponse from "../utils/errorResponse.js"

const checkLogin = (req, res, next) => {
    const { accessToken } = req.cookies 
    try {
        if(!accessToken){
           throw new Error("Auth Failure !!")
        }
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        

        req.userId = decoded.id
        next()
    
    } catch (error) {
        errorResponse(error, res)      
    }
}

export default checkLogin;
import jwt from "jsonwebtoken"


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
        new Error("Auth Failure !!")        
    }
}

export default checkLogin;
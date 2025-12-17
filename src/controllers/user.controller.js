import error from "mongoose/lib/error/index.js"
import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js"
import jwt from 'jsonwebtoken'


const handleSignUp = async (req, res) => {

    var { name, email, password } = req.body
    password = await hashPassword(password)

    try {
        await User.create({
            name,
            email,
            password
        })

        return res.status(201).json({
            "success": true,
            "message": "SignUp Successfull !"
        })
    } catch (error) {

        return res.status(401).json({
            "error": "SignUp Failed !!"
        })
    }


}
const handleSignIn = async (req, res) => {

    var { email, password } = req.body

    try {

        const user = await User.findOne({
            "email": email
        })

        if (!user) {
            throw new error("Email Not Found")
        }

        const isPasswordValid = await comparePassword(password, user.password)

        if (!isPasswordValid) {
            throw new error("Invalid Credentials")
        }

        const accessToken = jwt.sign(
            {
                id: user._id
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }

        )

        return res.status(201).json({
            "success": true,
            "message": "SignIn Successfull !",
            "accessToken": accessToken
        })
    } catch (error) {

        return res.status(401).json({
            "error": error.message
        })
    }


}



export {
    handleSignUp,
    handleSignIn
}
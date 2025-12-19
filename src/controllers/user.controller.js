
import { User } from "../models/user.model.js"
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js"
import jwt from 'jsonwebtoken'
import errorResponse from "../utils/errorResponse.js"
import { response } from "express"

const handleSignUp = async (req, res) => {

    var { name, email, password, isAdmin } = req.body
    password = await hashPassword(password)


    try {
        await User.create({
            name,
            email,
            password,
            isAdmin
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

    var { email, password,  } = req.body

    try {

        const user = await User.findOne({
            "email": email
        })

        if (!user) {
            throw new Error("Email Not Found")
        }

        const isPasswordValid = await comparePassword(password, user.password)

        if (!isPasswordValid) {
            throw new Error("Invalid Credentials")
        }

        const accessToken = jwt.sign(
            {
                id: user._id
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }

        )

        res.cookie("accessToken", accessToken)
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
const handleChangePass = async(req,res) => {
    const { email, password, newPassword } = req.body
    const user = await User.findOne({email})
    try {

        if(!user){
            throw new Error("User not exist !!")
        }

        const isValid = comparePassword(password, user.password)

        if(!isValid || !newPassword){
            throw new Error("Invalid Cred !!")
        }
        
        const hashedPassword = await hashPassword(newPassword)
        user.password = hashedPassword
        await user.save()

        return res.status(201).json({
            "success":true,
            "message":"password changed!!"
        })
    } catch (error) {
        errorResponse(error, res)
    }
}
const handleLogOut = async (req, res) => {
    try {
        res.clearCookie("accessToken")
        res.status(201).json({
            "success": true,
            "message": "logged out !"
        })
    } catch (error) {
        errorResponse(error, res)
    }
}



export {
    handleSignUp,
    handleSignIn,
    handleChangePass,
    handleLogOut
}
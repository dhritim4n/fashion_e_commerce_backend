import { Router } from "express";
import { 
        handleSignUp,
        handleSignIn,
        handleChangePass,
        handleLogOut
 } from "../controllers/user.controller.js";

const router = Router()

router.post('/signup', handleSignUp)
router.post('/signin', handleSignIn)
router.post('/changePass', handleChangePass)
router.post('/logout', handleLogOut)


export default router;
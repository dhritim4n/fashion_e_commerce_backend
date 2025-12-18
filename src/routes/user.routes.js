import { Router } from "express";
import { 
        handleSignUp,
        handleSignIn,
        handleChangePass
 } from "../controllers/user.controller.js";

const router = Router()

router.post('/signup', handleSignUp)
router.post('/signin', handleSignIn)
router.post('/changePass', handleChangePass)



export default router;
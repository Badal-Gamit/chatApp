import express from 'express'
import { logincontroller,signupController,logoutController } from '../controller/authcontroller.js'
const router=express.Router()

router.post('/login',logincontroller)
router.post('/signup',signupController)
router.get('/logout',logoutController)

export default router
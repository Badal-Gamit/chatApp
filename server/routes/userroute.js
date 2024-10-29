import express from 'express'
import { usercontroller } from '../controller/usercontroller.js'
import protectedroute from '../middleware/protectedroute.js'

const router=express.Router()
router.get('/',protectedroute,usercontroller)


export default router
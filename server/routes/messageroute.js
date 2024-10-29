import express from 'express'
import { getmessage, sendmessage } from '../controller/messagecontroller.js'
import protectedroute from '../middleware/protectedroute.js'
const router=express.Router()

router.post('/send-message/:id',protectedroute,sendmessage)
router.get('/get-message/:id',protectedroute,getmessage)


export default router
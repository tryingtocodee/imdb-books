import express from 'express'
import {regisAuth , loginAuth}  from '../controllers/login_regis_Auth.js'
const router = express.Router()
import login_regis_middleware from '../middlewares/login_regis_middleware.js'

router.post('/register' , login_regis_middleware , regisAuth)

router.post('/login' , login_regis_middleware , loginAuth)

router.post('/logout' , (req, res)=>{
    // apply this login on frontend
    res.json({msg:'user logged out successfully '})
})

export default router
import jwt from 'jsonwebtoken'
import user from '../model/usermodel.js'

const protectedroute=async (req,res,next) => {
    try {
        const {token}=req.cookies
         if (!token)  return res.status(400).json({message:"unauthorized acess"}) ;
        const verify=jwt.verify(token,process.env.jwt_secret)
       const decode=await user.findById({_id:verify.userid }).select('-password')
       if (!decode) return res.status(400).json({message:"unauthorized acess"}) ;
       req.user=decode
      next()
} catch (error) {
    console.log(`error in authorized`);
    
    res.status(500).json({message:error.message}) ;  
    }
}

export default protectedroute
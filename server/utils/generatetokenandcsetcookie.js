import jwt from 'jsonwebtoken'

const gentokenandsetcookie=async (userid,res) => {
     const token=jwt.sign({userid},process.env.jwt_secret,
        {expiresIn:"24h"}
     )      
     res.cookie('token',token,{
        maxAge:24*60*60*1000,
        httpOnly:true,
        sameSite: 'none',
        secure: true,  
    })
}
export default gentokenandsetcookie
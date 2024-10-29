import user from "../model/usermodel.js";
import bcrypt   from 'bcrypt'
import gentokenandsetcookie from "../utils/generatetokenandcsetcookie.js";

export const signupController=async (req,res) => {
    try {
          const {fullName,userName,password, gender, confirmPassword }=req.body ;
        
            
          if (password!= confirmPassword) return res.status(400).json({ message:"password doesn't match"});

          const finduser= await user.findOne({userName:userName})
          if (finduser) return res.status(400).json({ message:"user already exist"});
        const salt =await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`; 
         const User=await user.create({
            fullName
            ,userName
            ,password:hashpassword
            , gender, 
            profilepic:gender=='male'?boyProfilePic:girlProfilePic
         })
    gentokenandsetcookie(User._id,res)
  return res.status(201).json({
    User,
    message:'successfully created'
  })

    } catch (error) {
      console.log(error.message);
      
     return   res.status(500).json({
            message:"error in creating user"
        })
    }
}

export const logincontroller=async (req,res) => {
    try {
      const {userName,password }=req.body ; 
      const User= await user.findOne({userName:userName})
      if (!User) return res.status(400).json({ message:"wrong credentials"});
     const rightpassword=await bcrypt.compare(password,User.password)
  
     if (!rightpassword) return res.status(400).json({ message:"wrong credentials"});
     gentokenandsetcookie(User._id,res)
     return res.status(201).json({
      User,
      message:'successfully login'
    })

    } catch (error) {
      console.log(error.message);
      
      return   res.status(500).json({
             message:"error in login"
         })
    }
}

export const logoutController=async (req,res) => {
  try {
    res.clearCookie('token')
    
    res.status(201).json({message:"logout"})
  } catch (error) {
    console.log(error.message);
      
     return   res.status(500).json({
            message:"error in logout"
        })
  }
}

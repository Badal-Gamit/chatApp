import user from "../model/usermodel.js"

export const usercontroller=async (req,res) => { 
    try {
        const userid=req.user._id
    const alluser= await  user.find({_id:{$ne:userid}}).select('-password')
    res.status(200).json(alluser)
    } catch (error) {
        console.log(`error in get user controller`);
        
        return   res.status(500).json({
            message:error.message
        }) 
    }  
}
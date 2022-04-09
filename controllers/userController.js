const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose= require("mongoose");
const User= require("../models/user");
// post - register a user
exports.register= async(req,res,next)=>{

const { name ,email,password} = req.body;
try { 
    
    const  user = await User.findOne({email : email});
     if(user)
        return res.status(203).json({
         message : "User already exists"
     }) ;

    
 
    const result = await User.create({ 
        name : name,
        email : email,
        password: password


 })  ;
 if(result){  

     

     const payload={
        id : result._id,
        email : result.email  
     } ; 
    await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn:86400},
        (error,token)=>{
            if(error)
                return res.json({message:error});
            return res.json({
                message :"Success",
                token : "Bearer " + token
            });

        }
    )


    
    
    



 } 
 else {
    console.log("error during register"); 
    return  res.status(200).json({
        message : "Failed to Create"
    });
    

 }



    
} catch (error) { 
    
    res.status(203).json(error)
}



} 


// post - user login
exports.login= async(req,res,next)=>{
const {email,password}= req.body;

try { 
  
    const user =  await User.findOne({email :email}) ; 

  if(user){ 
    
    if(await user.matchPassword(password)){ 
        
        const payload={
            id : user._id,
            email : user.email 


                      } ;
        await jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:86400},
            (error,token)=>{
                if(error)
                    return res.json({message:error});
                return res.json({
                    message :"Success",
                    token : "Bearer " + token
                });

            }
        )
        



  


     }
    else { 
       
        res.status(400).json({error: "wrong password"});
    
  }
  } 
  else { 
      
      res.status(400).json({error : "wrong email"});
      
  }







    
} catch (error)
{ 
   return res.status(203).json(error); 
}




} 

// patch - change password
exports.updatePassword= async(req,res,next)=>{
    const id = req.params.userId.toString(); 
    var newpassword = req.body.newpassword.toString();
try {
    const salt = await bcrypt.genSalt(10);
    newpassword= await bcrypt.hash(newpassword,salt);
    const user= await User.findByIdAndUpdate(id,{
        password: newpassword
    }) 
    if(user) 
    return res.status(200).json({
        message: "Success",
        data : user
    })
    
} catch (error) {
    res.status(203).json({
        message:"Failed",
        error:error
    })
}


}
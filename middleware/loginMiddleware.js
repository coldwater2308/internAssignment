


const jsonwebtoken = require("jsonwebtoken");


const loginMiddleware = (req,res,next)=>{
   
  const token = req.headers['x-access-token']?.split(' ')[1];
  
  if(token){
    jsonwebtoken.verify(token ,process.env.JWT_SECRET,(error,decoded)=>{
      if(error)
       return  res.status(401).json({ 
         
          isLoggedIn : false , 
          message :"Failed to Authenticate"
        }) ;
     
      next();
      
  
  
    })
  } 
  else {
    res.status(401).json({message: "Incorrect Token" , isLoggedIn: false})
  }
  
  
      
  }
module.exports=loginMiddleware;
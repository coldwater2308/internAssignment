const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

password : {
type:String ,
required : true
}
,
name: {
    type : String ,
    required : true 


}, 


email: {
    type : String ,
   required:true


}, 

phone: {
    type : Number ,
  


},







} , {timestamps : true}) ; 
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    next();


    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);

}
);
userSchema.methods.matchPassword=async function (enteredpassword){
    return bcrypt.compare(enteredpassword,this.password);
}


const User = mongoose.model("User", userSchema);
module.exports= User;

const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({


eventName : {
type:String ,
required : true
}
,
type: {
    type : String ,
    required : true 


}, 


created_by: {
    type : mongoose.Types.ObjectId ,
   required:true


}, 

address: {
    type : String ,
  


},


invited:[{userId: {type: mongoose.Types.ObjectId, ref: 'User'}}],




} , {timestamps : true}) 
const Event = mongoose.model("Event", eventSchema);
module.exports= Event;
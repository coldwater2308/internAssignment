const mongoose = require("mongoose");
const Event = require("../models/event")
//get -get all events
exports.getAllEvents=async(req,res,next)=>{

try {
    const events = await Event.find();
    if(events)
    return res.status(200).json({
        message:"Success",
        data : events
    })
} catch (error) {
     res.status(203).json({
         message:"Failed",
         error: error
     })
}


}
//post -create event

exports.createEvent= async(req,res,next)=>{
  const { name , type,createdBy,address}= req.body

try { 
    const event = await Event.create({
        eventName: name ,
        type:type,
        created_by: createdBy,
        address:address
    }) 
    if(event)
    return res.status(200).json({
        message: "Success"
    })
    
} catch (error) {
    res.status(203).json({
        message:"Failed",
        error: error
    })
}


    } 
//get - get particular event by id
exports.getEvent= async(req,res,next)=>{
     
      const eventId = req.params.id.toString();
    try { 
          const event = await Event.findById(eventId)
          if(event)
          return res.status(200).json({
              message: "Success",
              data: event
          })
          
        } 
    catch (error) {
          res.status(203).json({
              message:"Failed",
              error: error
          })
      }
      
      
}  
// patch - update particular event
exports.updateEvent= async(req,res,next)=>{
    const { name , type,createdBy,address}= req.body
    const id = req.params.id.toString();
    try { 
              const event = await Event.findByIdAndUpdate( id,{
                  name: name ,
                  type:type,
                  created_by: createdBy,
                  address:address
              }) 
              if(event)
              return res.status(200).json({
                  message: "Success"
              })
              
          } 
    catch (error) {
              res.status(203).json({
                  message:"Failed",
                  error: error
              })
          }
          
          
} 
// delete - delete particular event
exports.deleteEvent= async(req,res,next)=>{
    const id = req.params.id.toString();
              
    try { 
            const event = await Event.findByIdAndDelete(id)
                  if(event)
                  return res.status(200).json({
                      message: "Success"
                  })
                  
        } 
    catch (error) {
                  res.status(203).json({
                      message:"Failed",
                      error: error
                  })
              }
              
              
}
// get - get all events created by user
exports.getEventsByUser = async(req,res,next)=>{
    const userId = req.params.userId.toString();

                 
    try { 

            let { pages, size, sort } = req.query;
  
                    // If the page is not applied in query.
                if (!pages) {
              
                        // Make the Default value one.
                    pages = 1;
                    }
              
                    if (!size) {
                        size = 10;
                    }
              
                    //  We have to make it integer because
                    // query parameter passed is string
                const limit = parseInt(size); 
                const page= parseInt(pages)
                const events = await Event.find({created_By:mongoose.Types.ObjectId(userId)}).skip((page-1)*limit).limit(limit).sort({ createdAt: 1, _id: 1 })
              
                if (events)
                    return res.status(200).json({
                          message:"Success",
                          page  : page ,
                          size: size ,
                          data : events
                      }) 
                      
                  } 
                  catch (error) {
                      res.status(404).json({
                          message:"Failed",
                          error : error
                      })
                  }



}
// get - get events in which user is invited
exports.getInvitedEvents= async(req,res,next)=>{

    const id = req.params.userId.toString();
    try { 
        let { pages, size, sort } = req.query;
  
                        // If the page is not applied in query.
        if (!pages) {
                  
                            // Make the Default value one.
             pages = 1;
                     }
                  
        if (!size) {
            size = 10;
                     }
                
                        //  We have to make it integer because
                        // query parameter passed is string
        const limit = parseInt(size);
        const page=parseInt(pages)

        const events= await Event.find({"invited.userId" : mongoose.Types.ObjectId(id)}).sort({ createdAt: 1, _id: 1 }).skip((page-1)*limit).limit(limit)
                   if(events)
                        return res.status(203).json({
                            message:"Success",
                            page  : page ,
                            size: size ,
                            data : events
                        })
        } 
                    
        catch (error) {
             res.status(203).json({
                    message:"Failed",
                    error:error
                        })
                    }


}
// patch - invite a user to a particular event
exports.postInviteUser = async(req,res,next)=>{
    const id = req.params.eventId.toString();
    const {userId} = req.body
    try { 
        const invite= await Event.findByIdAndUpdate(id,{ $push: { invited: {userId: mongoose.Types.ObjectId(userId)} } } ) 
            if(invite)
                return res.status(200).json({
                         message: "User Invited Successfully"
                        })
                        
                    }
     catch (error) {
        res.status(203).json({
                message:"Failed",
                error: error
                        })
                    }



}  
// get - get all invited users of a particular event
exports.getInvitedUsers= async(req,res,next)=>{

    const eventId= req.params.eventId.toString();
    try { 
            const event = await Event.findById(eventId);
            if(event)
                res.status(200).json({
                        message:"Success",
                        data: event.invited
                          })
                          
        } 
                      
    catch (error) {
        res.status(404).json({
                message:"Event not found"
                             })
                      }


}

const express = require("express");
const router = express.Router(); 
const eventController= require("../controllers/eventController"); 
//get all events
router.get('/',eventController.getAllEvents)
//create event
router.post('/create',eventController.createEvent)
//get event by event id
router.get('/event/:id',eventController.getEvent)
// update particular event
router.patch('/update/:id',eventController.updateEvent)
//delete particular event
router.delete('/delete/:id',eventController.deleteEvent) 
//get events create by user
router.get('/user/:userId',eventController.getEventsByUser)
//invite a user
router.patch('/:eventId/invite/',eventController.postInviteUser) 
//get events in which user is invited
router.get('/invitedevents/user/:userId',eventController.getInvitedEvents) 
// get all invited users in particular event
router.get('/:eventId/invitedUsers/',eventController.getInvitedUsers) 
module.exports= router;
const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController'); 
const loginMiddleware = require("../middleware/loginMiddleware");
//Register A User
router.post('/register',userController.register) ;
//Login
router.post ('/login', userController.login);
//Update Password 

router.patch('/updatepassword/:userId',loginMiddleware,userController.updatePassword)
module.exports = router;
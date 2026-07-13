const express=require('express');
const { body } = require('express-validator');
const { createEvent, deleteEvent, getAllEvents, updateEvent } = require('../controllers/event.controller');
const upload = require('../middlewares/multer.middleware');
const verifyJwt = require('../middlewares/Authentication.middleware');
const authorizeRoles = require('../middlewares/role.middleware');
const eventRouter=express.Router();



eventRouter.post('/create-event',verifyJwt,authorizeRoles("HOST"),
    upload.fields([
        {
           name: "banner",
           maxCount: 1 
        }
    ]),
    [
body('name').isLength({min:3}).withMessage('Name should have atleast 3 letters'),
body('eventType').isIn(['COMEDY','SEMINAR','WORKSHOP','SPORTS','HACKATHON','CONCERT']).withMessage('event type should be only those')
],createEvent);

eventRouter.delete('/delete-event/:id',verifyJwt,authorizeRoles("HOST"),deleteEvent);

eventRouter.get('/get-events',getAllEvents);

eventRouter.patch('/update-event/:id',verifyJwt,authorizeRoles("HOST"),upload.fields([
    {
name: "banner",
maxCount: 1

    }
]),updateEvent);




module.exports=eventRouter;

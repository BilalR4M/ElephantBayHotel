const express = require('express')
const Event = require("../model/Event");
const router = express.Router()

const {
    setAdmin,
    adminLogin,
    updateAdminPassword,
  } = require("../controller/adminController");
  const {
    setEmployee,
    employeeLogin,
    updateEmployeePassword,
    deleteEmployee,
    getemployee,
  } = require("../controller/empController");
  const {
    setTask,
    deleteTask,
    getTask,
    updateTask,
    getEmployeeTask,
  } = require("../controller/taskController");
  
  // reservation
  const {
    getReservations,
    getReservation,
    deleteReservation,
    updateReservation,
    createReservation
  
  } = require('../controller/reservationController');
  

const userSignupController = require('../controller/user/userSignup')
const userSigninController = require('../controller/user/userSignin')
const userDetailsController = require('../controller/user/userDetails')
const autherToken = require('../middleware/autherToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadPackageController = require('../controller/offers/uploadpackage')
const getPackageController = require('../controller/offers/getPackage')
const updatepackageController = require('../controller/offers/updatePackage')
const getCategoryList = require('../controller/offers/getCategoryList')
const getCategoryWisePackages = require('../controller/offers/getCategorywisePackages')
const getPackageDetails = require('../controller/offers/getPackageDetails')
const searchPackage = require('../controller/offers/searchPackage')
const deletePackageController = require('../controller/offers/deletePackage')
const sendEmailController = require('../controller/email/sendEmai')
const getEmailController = require('../controller/email/getEmails')
const { sendEmailMsgController } = require('../controller/email/sendEmailMsg')
const storeEmailMsgController = require('../controller/email/storeSendMsg')
const getSendMessagesController = require('../controller/email/getsendMsg')
const addFeedbackController = require('../controller/feedback/addfeedback')
const getAllFeedbacksController = require('../controller/feedback/getallfeedback')
const deleteFeedbackController = require('../controller/feedback/deletefeedback')
const { updateFeedback } = require('../controller/feedback/updatefeedback')

//room routes
const UploadRoomController = require('../controller/rooms/uploadRoom')
const getRoomController = require('../controller/rooms/getRoom')
const updateRoomController = require('../controller/rooms/updateRoom')
const getCategoryListRoom = require('../controller/rooms/getCategoryListRoom')
const getCategoryWiseRoom = require('../controller/rooms/getCategorywiseRoom')
const getRoomDetails = require('../controller/rooms/getRoomDetails')
const searchRoom = require('../controller/rooms/searchRoom')
const deleteRoomController = require('../controller/rooms/deleteRoom')


router.post("/signup",userSignupController)
router.post("/signin",userSigninController)
router.get("/user-details",autherToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-users",autherToken,allUsers)
router.post("/update-user",autherToken,updateUser)

//packages
router.post("/upload-package",autherToken,UploadPackageController)
router.get("/get-package",getPackageController)
router.post("/update-package",autherToken,updatepackageController)
router.get("/get-category",getCategoryList)
router.post("/category-wise-package",getCategoryWisePackages)
router.post("/package-details",getPackageDetails)
router.get("/search",searchPackage)
router.post("/delete-package",autherToken,deletePackageController)

//email
router.post("/send-email",sendEmailController)
router.get("/get-emails",getEmailController)
router.post("/send-message",sendEmailMsgController)
router.post("/store-message",storeEmailMsgController)
router.get("/get-send-message",getSendMessagesController)


//feedback
router.post("/add-feedback",addFeedbackController)
router.get("/get-feedback",getAllFeedbacksController)
router.post("/update-feedback/:id",updateFeedback)
router.post("/delete-feedback",deleteFeedbackController)

//rooms
router.post("/upload-room",autherToken,UploadRoomController)
router.get("/get-room",getRoomController)
router.post("/update-room",autherToken,updateRoomController)
router.get("/get-category-room",getCategoryListRoom)
router.post("/category-wise-room",getCategoryWiseRoom)
router.post("/room-details",getRoomDetails)
router.get("/search",searchRoom)
router.post("/delete-room",autherToken,deleteRoomController)

//Housekeeping admin routes
router.route("/v1/setadmin").post(setAdmin);
router.route("/v1/adminlogin").post(adminLogin);

//employee routes

router.route("/v1/setemployee").post(setEmployee);
router.route("/v1/delete_employee/:id").get(deleteEmployee);
router.route("/v1/getemployee").get(getemployee);
router.route("/v1/employeelogin").post(employeeLogin);

//task routes
router.route("/v1/settask").post(setTask);
router.route("/v1/deletetask/:id").get(deleteTask);
router.route("/v1/gettask").get(getTask);
router.route("/v1/updatetask/:id").put(updateTask);
router.route("/v1/getemployeetask/:id").get(getEmployeeTask);

// events logic and routes
router.route("/event/addEvent").post((req, res) => {
    const { ename, edate, stime, etime, available, descrip, contactNo, hallType, capacity } = req.body;
  
    const newEvent = new Event({
        ename,
        edate,
        stime,
        etime,
        available,
        descrip,
        contactNo,
        hallType,
        capacity
    });
  
    newEvent.save()
        .then(() => {
            res.json("Event Added");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error adding event");
        });
  });
  
  router.route("/event/").get((req, res) => {
    Event.find()
        .then((events) => {
            res.json(events);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error fetching events");
        });
  });
  
  router.route("/event/updateEvent/:id").put(async (req, res) => {
    const eventId = req.params.id;
    const { ename, edate, stime, etime, available, descrip, contactNo, hallType, capacity } = req.body;
  
    const updateEvent = {
       ename,
       edate,
       stime,
       etime,
       available,
       descrip,
       contactNo,
       hallType,
       capacity
    };
  
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateEvent, { new: true });
        res.status(200).json({ status: "event updated", event: updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating event" });
    }
  });
  
  router.route("/event/deleteEvent/:id").delete(async (req, res) => {
    let eventId = req.params.id.trim(); // Trim whitespace characters
  
    try {
        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ status: "event deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error deleting event", error: err.message });
    }
  });
  
  
  router.route("/event/getEvent/:id").get(async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        res.status(200).json({ status: "event fetched", event: event });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error fetching event", error: err.message });
    }
  });
  
  //reservation routes
  //attach handler 
  //GET all 
  router.get('/reservation/', getReservations);
  
  //GET single 
  router.get('/reservation/:id', getReservation);
  
  //POST 
  router.post('/reservation/', createReservation);
  
  //DELETE 
  router.delete('/reservation/:id', deleteReservation);
  
  
  //UPDATE 
  router.patch('/reservation/:id', updateReservation);
  

module.exports=router
import express from "express";
import { adminLogin, adminRegister } from "../controllers/adminController.js";
import {
  getLogo,
  logoDelete,
  logoEdit,
  logoUpload,
} from "../controllers/logoController.js";
import upload from "../middleware/multerConfig.js";

import { addHomeBanner, editHomeBanner, getHomeBanner } from "../controllers/homeBannerController.js";
import { addMotto } from "../controllers/mottoController.js";
import { enqiury, getEnquiry, updateEnquiryStatus } from "../controllers/enquiryController.js";
import { editMissionValues, getMissionValues, missionValues } from "../controllers/missionValuesController.js";
import { addEvent, deleteEvent, editEvent, getEvent } from "../controllers/eventController.js";
import {addTestimonial , deleteTestimonial, editTestimonial, getTestimonail} from './../controllers/testimonilaController.js';
import { addPrincipal, deletePrincipal, editPrincipal, getPrincipal } from "../controllers/principalController.js";
import { addMessage, deleteMessage, editMessage, getMessage } from "../controllers/messageController.js";
import { addFooter, editFooter, getFooter } from "../controllers/footerController.js";
import { addGallery, deleteGallery, editGallery, getGallery } from "../controllers/galleryController.js";
import { addApplication, deleteApplication, editApplication, getApplication } from "../controllers/applicationController.js";
import uploadPDF from "../middleware/multerConfigPdf.js";
import {addCampus, editCampus, getCampus} from './../controllers/campusController.js';
import { addAboutOverview, editAboutOverview, getAboutOverviews } from "../controllers/aboutController.js";
import { addGovtOrder, getGovtOrders } from "../controllers/govtOrderController.js";
import { addCourse, getCourse } from './../controllers/courseController.js';
import { addCourseName, getAllCourseNames } from "../controllers/courseNameController.js";
import { addCampusName, getCampusName } from "../controllers/campusNameController.js";
import { addCampusData, getCampusData } from "../controllers/campusDataController.js";

const adminRouter = express.Router();

//routes for admin login & register
adminRouter.post("/adminRegister", adminRegister);
adminRouter.post("/adminLogin", adminLogin);

//routes for logo upload and edit
adminRouter.post("/logoUpload", upload.array("logo", 1), logoUpload);
adminRouter.post("/logoEdit", upload.array("logo", 1), logoEdit);
adminRouter.delete("/logoDelete", logoDelete);
adminRouter.get('/getLogo',getLogo)

//routes for home Banner add & edit
adminRouter.post(
  "/addHomeBanner",
  upload.fields([
    { name: "banner1_image", maxCount: 1 },
    { name: "banner2_image", maxCount: 1 },
    { name: "banner3_image", maxCount: 1 },
  ]),
  addHomeBanner
);

adminRouter.post(
    "/editHomeBanner",
    upload.fields([
      { name: "banner1_image", maxCount: 1 },
      { name: "banner2_image", maxCount: 1 },
      { name: "banner3_image", maxCount: 1 },
    ]),
    editHomeBanner
  );

  adminRouter.get('/getHomeBanner' , getHomeBanner)

//route for motto add and edit
  adminRouter.post('/addMotto' , addMotto)
//   adminRouter.post('/editMotto' , editMotto)

//route for enquiry and view
adminRouter.post('/enquiry' , enqiury)
adminRouter.get('/getEnquiry' , getEnquiry )
adminRouter.post('/editEnquiry' , updateEnquiryStatus )

//route for mission and values
adminRouter.post('/addMissionValues', missionValues)
adminRouter.post('/editMissionValues', editMissionValues)
adminRouter.get('/getMissionValues' , getMissionValues)

//route for event add,edit and delete
adminRouter.post('/addEvent', upload.array("image", 1) , addEvent)
adminRouter.delete('/deleteEvent/:id', deleteEvent)
adminRouter.get('/getEvent', getEvent)
adminRouter.post('/editEvent', upload.array("image", 1) ,editEvent)

//route for testimonial add,delete
adminRouter.post('/addTestimonial', upload.array("profile", 1) , addTestimonial )
adminRouter.get('/getTestimonial', getTestimonail )
adminRouter.delete('/deleteTestimonial/:id' , deleteTestimonial)
adminRouter.post('/editTestimonial', upload.array("profile", 1)  ,editTestimonial)

// route for about overview add , delete , edit , get
adminRouter.post('/addAboutOverview', upload.single('image' , 1) , addAboutOverview)
adminRouter.get('/getAboutOverview' , getAboutOverviews)
adminRouter.post('/editAboutOverview', upload.single("image", 1) , editAboutOverview)

//route for campus overview
// adminRouter.post('/addCampusOverview',  addCampus)



//routes for principal
adminRouter.post('/addPrincipal', upload.array("image" , 1) , addPrincipal)
adminRouter.get('/getPrincipal' , getPrincipal)
adminRouter.post('/editPrincipal' , upload.array("image" , 1)  , editPrincipal)
adminRouter.delete('/deletePrincipal/:id' , deletePrincipal)

//routes for message
adminRouter.post('/addMessage', upload.array("image" , 1) , addMessage)
adminRouter.get('/getMessage' , getMessage )
adminRouter.post('/editMessage' , upload.array("image" , 1) , editMessage)
adminRouter.delete('/deleteMessage/:id' , deleteMessage)

// routes for footer
adminRouter.post('/addFooter' , addFooter)
adminRouter.post('/editFooter' , editFooter)
adminRouter.get('/getFooter' , getFooter)

//routes for gallery
adminRouter.post('/addGallery', upload.array('image', 1) , addGallery)
adminRouter.get('/getGallery' , getGallery)
adminRouter.delete('/deleteGallery/:id' , deleteGallery) 
adminRouter.post('/editGallery' , upload.array('image', 1) , editGallery)

//routes for application
adminRouter.post('/addApplication',uploadPDF.array('pdf',1),addApplication)
adminRouter.post('/editApplication' , uploadPDF.array('pdf',1) , editApplication)
adminRouter.delete('/deleteApplication' , deleteApplication)
adminRouter.get('/getApplication' , getApplication)




//routes for courses - add,del,edit,get
adminRouter.post('/addCourse', upload.single('image'), addCourse); 
adminRouter.get('/getCourse', getCourse);
//routes for campus
// adminRouter.post('/addCampus', upload.single('facilityImage' , 1) , addCampus)
adminRouter.post('/addCampus', upload.array('facilityImages'), addCampus);
adminRouter.get('/getCampus',getCampus)
adminRouter.post('/editCampus' , upload.array('facilityImages') ,editCampus)


//routes for courseName
adminRouter.post('/addCourseName' , addCourseName)
adminRouter.get('/getCourseName' , getAllCourseNames)
// adminRouter.post('/editCourseName' , editCourseName)


//routes for campus
adminRouter.post('/addCampusName' , addCampusName)
adminRouter.get('/getCampusName' , getCampusName)

adminRouter.post('/addCampusData', upload.single('image' , 1)  , addCampusData)
adminRouter.get('/getCampusData' , getCampusData)


const uploadFields = uploadPDF.fields([ { name: 'pdf1', maxCount: 1 }, { name: 'pdf2', maxCount: 1 }, { name: 'pdf3', maxCount: 1 }, { name: 'pdf4', maxCount: 1 }, { name: 'pdf5', maxCount: 1 }, { name: 'pdf6', maxCount: 1 }, { name: 'pdf7', maxCount: 1 }, { name: 'pdf8', maxCount: 1 }, { name: 'pdf9', maxCount: 1 } ]);
//routes for govt orders
adminRouter.post('/addGovtOrders' , uploadFields , addGovtOrder)
adminRouter.get('/getGovtOrders' , getGovtOrders)

export default adminRouter;

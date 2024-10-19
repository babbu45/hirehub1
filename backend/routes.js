const express = require('express');
const filesController = require('./controllers/filesController');
const genaiController = require('./controllers/genaiController');
const jobController = require('./controllers/jobController');
const router=express.Router();
const multer=require('multer');
// const storage=multer.memoryStorage()
const upload=multer();
console.log(upload)
router.get("/jobs",jobController.getJobs);
router.post("/jobs",jobController.postJobs);
router.post("/generateJobs",upload.single('resume'),filesController.pdfParse,genaiController.generateJobs,jobController.searchJobs);
router.post("/generate",upload.single('resume'),filesController.pdfParse);
router.post("/generateEmail",upload.single('resume'),filesController.pdfParse,genaiController.generateColdEmail);
router.post("/generateReview",upload.single('resume'),filesController.pdfParse,genaiController.generateReview);
module.exports=router;
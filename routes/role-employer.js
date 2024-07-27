const express = require('express');
const router = express.Router();
const JobPostController = require('../controllers/JobPostController');
const { authentication } = require('../middleware/authMiddleware'); // สำหรับการตรวจสอบ JWT

// Route สำหรับประกาศงานใหม่
router.post('/job-posts', authentication, JobPostController.createJobPost);

// Route สำหรับแก้ไขงานที่ประกาศ
router.put('/job-post/:id', authentication, JobPostController.updateJobPost);

// Route สำหรับลบงานที่ประกาศ
router.delete('/job-post/:id', authentication, JobPostController.deleteJobPost);

// // Route สำหรับดูผู้สมัครของงานที่ประกาศ
// router.get('/job-posts/:id/applicants', authentication, JobPostController.viewApplicants);



// Route view Job
router.get('/job-all',JobPostController.JobAll);

// Route view Job with ID
router.get('/job-detail/:id',JobPostController.JobwithId)
module.exports = router;

// const User= require('../models/User'); // เชื่อมต่อกับโมเดล JobPost และ User
const Employer = require('../models/Employer');
const JobPost = require('../models/JobPosts'); //
const WorkType = require('../models/WorkType');
const WorkClassify = require('../models/WorkClassify');

class JobPostController {
    // สร้างการประกาศงานใหม่
    async createJobPost(req, res) {
        const { title, description, requirements, salary, worktype_id, workclassify_id } = req.body;
        const employerId = req.user.id; // ใช้ id ของ employer จาก JWT

        try {
            const jobPost = await JobPost.create({
                title,
                description,
                requirements,
                salary,
                worktype_id,
                workclassify_id,
                employer_id: employerId
            });


            res.status(201).json(jobPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // แก้ไขการประกาศงาน
    async updateJobPost(req, res) {
        const jobPostId = req.params.id;
        const { title, description, requirements, salary, worktype_id, workclassify_id } = req.body;
        const {id} = req.user;
        console.log(`log employer id: ${req.user.id}`);
        try {
            const jobPost = await JobPost.findOne({
                where: {
                    id: jobPostId,
                    employer_id: id
                }
            });

            if (!jobPost) {
                return res.status(404).json({ message: 'Job post not found or unauthorized' });
            }

            jobPost.title = title || jobPost.title;
            jobPost.description = description || jobPost.description;
            jobPost.requirements = requirements || jobPost.requirements;
            jobPost.salary = salary || jobPost.salary;
            jobPost.worktype_id = worktype_id || jobPost.worktype_id;
            jobPost.workclassify_id = workclassify_id || jobPost.workclassify_id;

            await jobPost.save();

            res.status(200).json(jobPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // ลบการประกาศงาน
    async deleteJobPost(req, res) {
        const jobPostId = req.params.id;
        const employerId = req.user.id;

        try {
            const jobPost = await JobPost.findByPk(jobPostId);

            if (!jobPost || jobPost.employer_id !== employerId) {
                return res.status(404).json({ message: 'Job post not found or unauthorized' });
            }

            await jobPost.destroy();

            res.status(200).json({ message: 'Job post deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }



    // ดูรายละเอียดงานตาม ID
    async JobwithId(req, res) {
        const { id } = req.params;

        try {
            const jobPost = await JobPost.findOne({
                where: { id },
                include: [
                    {
                        model: Employer,
                        as: 'employer',
                        attributes: ['company_address']
                    },
                    {
                        model: WorkType,
                        as: 'w_type',
                        attributes: ['worktype_name']
                    },
                    {
                        model: WorkClassify,
                        as: 'w_classify', // ใช้ alias ที่กำหนดใน JobPosts model
                        attributes: ['work_classify_name'] // ดึงเฉพาะชื่อการจัดประเภทงานจากตาราง WorkClassify
                    }
                ]

            })

            if (!jobPost) {
                return res.status(404).json({ message: 'Job post not found' });
            }

            res.status(200).json(jobPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // ดูข้อมูลงานทั้งหมด
    async JobAll(req, res) {
        try {
            const jobPosts = await JobPost.findAll({
                include: [
                    {
                        model: Employer,
                        as: 'employer',
                        attributes: ['company_name','company_address']
                    },
                    {
                        model: WorkType,
                        as: 'w_type',
                        attributes: ['worktype_name']
                    },
                    {
                        model: WorkClassify,
                        as: 'w_classify', // ใช้ alias ที่กำหนดใน JobPosts model
                        attributes: ['work_classify_name'] // ดึงเฉพาะชื่อการจัดประเภทงานจากตาราง WorkClassify
                    }


                ]
            });
            // การสร้างอ็อบเจ็กต์ใหม่ที่มีโครงสร้างที่คุณต้องการ
            const JobAll = jobPosts.map(post => ({
                id: post.id,
                title: post.title,
                company_name:post.employer.company_name,
                description: post.description,
                requirements: post.requirements,
                salary: post.salary,
                status: post.status,
                worktype_name: post.w_type.worktype_name,
                work_classify_name: post.w_classify.work_classify_name,
                employer_id: post.employer_id,
                company_address: post.employer.company_address,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            }));

            res.status(200).json(JobAll);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new JobPostController();

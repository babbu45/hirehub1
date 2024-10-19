const {generateColdEmail:generate,suggestJobs,reviewResume}=require("../genai")
exports.generateColdEmail=async (req,res)=>{
    try {
        const {companyDescription,jobDescription}=req.body;
        const resumeData=req.resumeData.text;
        // console.log("resumeData",resumeData)
        const email=await generate(resumeData,companyDescription,jobDescription);
        res.json({email});
    } catch (error) {
        console.log("error",error)
        res.status(500).send('Error generating email');
    }
}
exports.generateJobs=async (req,res,next)=>{
    try {
        const resumeData=req.resumeData.text;
        const jobs=await suggestJobs(resumeData);
        // jobs=jobs.split('\n').map(job=>job.trim()).filter(job=>job.length>0);
        // console.log("jobs",jobs)
        req.search=jobs;
        next();
    } catch (error) {
        res.status(500).send('Error generating jobs');
    }
}
exports.generateReview=async (req,res)=>{
    try {
        const resumeData=req.resumeData.text;
        const {jobDescription}=req.body;
        const review=await reviewResume(resumeData,jobDescription);
        res.json({review});
    } catch (error) {
        res.status(500).send('Error generating review');
    }
}
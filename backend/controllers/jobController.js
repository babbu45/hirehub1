
const JobPosting = require("../models/JobPostingModel");


exports.getJobs= async (req, res) => {
  const { searchQuery, location, companyId } = req.query; 
  try {
    let query = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (location) {
      query.location = location;
    }

    const jobs = await JobPosting.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

exports.postJobs= async (req, res) => {
    const { title, description, location, link, expiry } = req.body;
    try {
      const newJob = new JobPosting({
        title,
        description,
        location,
        link,
        expiry,
      });
      await newJob.save();
      res.status(201).json(newJob);
    } catch (error) {
      res.status(400).json({ message: "Error posting job", error });
    }
  };
  exports.searchJobs = async (req, res) => {
    try {
      const jobs = req.search;
      const jobSet = new Set();
  
      for (let i = 0; i < jobs.length; i++) {
        const jobResults = await JobPosting.find({ $text: { $search: jobs[i] } });
        jobResults.forEach(job => jobSet.add(JSON.stringify(job)));
      }
      
      const uniqueJobs = Array.from(jobSet).map(job => JSON.parse(job));
      res.json(uniqueJobs,jobs);
    } catch (error) {
      console.log("error", error);
      res.status(500).send('Error searching jobs');
    }
  };
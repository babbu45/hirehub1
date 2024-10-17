import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, MapPinIcon } from "lucide-react";
import mockJobsData from "@/mockJobsData"; // Import your mock data
import { ApplyJobDrawer } from "@/components/ApplyJobDrawer"; // Import ApplyJobDrawer

const JobPage = () => {
  const { id } = useParams(); // assuming you're using react-router
  const { isLoaded, user } = useUser(); // Clerk user hook
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [applied, setApplied] = useState(false);

  // Fetch job data and check if the user has already applied
  useEffect(() => {
    if (isLoaded) {
      const jobData = mockJobsData.jobs.find((job) => job.id === id);
      setJob(jobData);

      // Check if the user has already applied for this job
      const userApplication = jobData?.applications?.find(
        (app) => app.candidate_id === user?.id
      );
      setApplied(!!userApplication);

      setLoadingJob(false); // Set loading to false after the data is fetched
    }
  }, [isLoaded, id, user]);

  // Fetch job data again (used in ApplyJobDrawer)
  const fetchJob = () => {
    const updatedJobData = mockJobsData.jobs.find((job) => job.id === id);
    setJob(updatedJobData);
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      {/* Job Title and Company Logo */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">{job?.title}</h1>
        {job?.company?.logo && (
          <img src={job?.company?.logo} alt={job?.company?.name} className="h-12 w-12" />
        )}
      </div>

      {/* Job Info: Location, Applicants, Status */}
      <div className="flex flex-wrap justify-between items-center my-4">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="h-5 w-5" />
          <p>{job?.location}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <p>{job?.applications?.length || 0} Applicants</p> {/* Display number of applicants */}
        </div>
        <div className="badge bg-green-500 text-white px-3 py-1">
          {job?.isOpen ? "Open" : "Closed"} {/* Job open/closed status */}
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-8">
        <h2 className="font-bold text-2xl mb-4">About the Job</h2>
        <p className="text-lg">{job?.description}</p>
      </div>

      {/* Job Requirements */}
      <div className="mt-8">
        <h2 className="font-bold text-2xl mb-4">Requirements</h2>
        <ul className="list-disc list-inside">
          {job?.requirements?.map((requirement, index) => (
            <li key={index} className="text-lg">{requirement}</li>
          ))}
        </ul>
      </div>

      {/* Apply Button or Drawer */}
      <div className="mt-8">
        {user?.id !== job?.recruiter_id && (
          <ApplyJobDrawer
            user={user}
            job={job}
            applied={applied}
            fetchJob={fetchJob}
          />
        )}
      </div>
    </div>
  );
};

export default JobPage;

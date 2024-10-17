// Import mock data (your mock jobs and applications data)
import mockJobsData from "@/mockJobsData";

// - Apply to job (candidate)
export async function applyToJob(jobData) {
  // Find the job and push the new application
  const job = mockJobsData.jobs.find((job) => job.id === jobData.job_id);

  if (!job) {
    throw new Error("Job not found");
  }

  // Simulate creating a random application ID
  const random = Math.floor(Math.random() * 90000);
  const newApplication = {
    id: random,
    ...jobData,
    resumeUrl: URL.createObjectURL(jobData.resume), // Simulate resume upload with local URL
    status: "applied",
  };

  // Push the application into the job's applications list (in mock data)
  job.applications = job.applications || [];
  job.applications.push(newApplication);

  return newApplication;
}

// - Edit Application Status (recruiter)
export async function updateApplicationStatus({ job_id, application_id }, status) {
  const job = mockJobsData.jobs.find((job) => job.id === job_id);

  if (!job) {
    throw new Error("Job not found");
  }

  const application = job.applications.find((app) => app.id === application_id);

  if (!application) {
    throw new Error("Application not found");
  }

  // Update application status in the mock data
  application.status = status;

  return application;
}

// - Get Applications for a candidate
export async function getApplications({ user_id }) {
  // Find all applications made by the user
  const applications = mockJobsData.jobs
    .flatMap((job) => job.applications || [])
    .filter((app) => app.candidate_id === user_id);

  if (!applications) {
    throw new Error("No applications found");
  }

  return applications;
}

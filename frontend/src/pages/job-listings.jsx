// JobListing.jsx

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card"; 
import { Input } from "@/components/ui/input"; // Assuming these are valid imports in your project
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city"; // Ensure this package is installed
import mockJobsData from "@/mockJobsData"; // Adjust the import path as necessary

const mockCompanies = [
  { id: "1", name: "Google" },
  { id: "2", name: "Facebook" },
  { id: "3", name: "Netflix" },
  { id: "4", name: "Amazon Web Services" },
  { id: "5", name: "Apple" },
];

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [jobs, setJobs] = useState(mockJobsData.jobs);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Fetch jobs based on filters
  useEffect(() => {
    const fetchJobs = () => {
      setLoadingJobs(true);
      let filteredJobs = mockJobsData.jobs;

      // Filter based on search query
      if (searchQuery) {
        filteredJobs = filteredJobs.filter((job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter based on location
      if (location) {
        filteredJobs = filteredJobs.filter((job) => job.location.includes(location));
      }

      // Filter based on company
      if (companyId) {
        const selectedCompany = mockCompanies.find((comp) => comp.id === companyId);
        filteredJobs = filteredJobs.filter((job) => job.company.name === selectedCompany?.name);
      }

      setTimeout(() => {
        setJobs(filteredJobs);
        setLoadingJobs(false);
      }, 500);
    };

    fetchJobs();
  }, [searchQuery, location, companyId]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    setSearchQuery(query);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setCompanyId("");
    setLocation("");
  };

  return (
    <div>
    <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 shadow-md rounded-lg p-4 bg-white">
  Latest Jobs For You
</h1>






      {/* Search Form */}
      <form onSubmit={handleSearch} className="h-14 flex flex-row w-full gap-2 items-center mb-3">
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      {/* Filters: Location and Company */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Location Filter */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Company Filter */}
        <Select value={companyId} onValueChange={(value) => setCompanyId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {mockCompanies.map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        <Button className="sm:w-1/2" variant="destructive" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Job Listings */}
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {!loadingJobs && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap from 6 to 8 */}
          {jobs.length ? (
            jobs.map((job) => (
              <div key={job.id} className="p-4"> {/* Added padding around each JobCard */}
                <JobCard job={job} />
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;

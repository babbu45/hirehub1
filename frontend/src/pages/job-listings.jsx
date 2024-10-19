import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";
import { useParams } from "react-router-dom";

const JobListing = () => {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [pdf, setPdf] = useState(null);
  // Fetch jobs based on filters
  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      try {
        const response = await axios.get("http://localhost:5000/apiv1/jobs", {
          params: {
            searchQuery,
            location,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, [searchQuery, location]);

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
    setLocation("");
  };
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("resume", file);
    const jobs = await axios.post(
      "http://localhost:5000/apiv1/generateJobs",
      formData
    );
    // setJobs(jobs.data.jobs);
    setJobs(jobs.data);
    // console.log(jobs.data);
  };
  return (
    <div className="mx-3">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 rounded-lg p-6 bg-gradient-to-r from-purple-400 to-blue-600 text-white">
        Latest Jobs For You
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        style={{ borderRadius: "10px" }}
        className="h-14 flex flex-row w-full gap-4 items-center mb-6 p-4 rounded-lg "
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title or Description..."
          name="search-query"
          style={{ borderRadius: "10px" }}
          className="h-full flex-1 px-4 text-md rounded-lg shadow-inner"
        />
        <Button
          type="submit"
          style={{ borderRadius: "10px" }}
          className="h-full sm:w-28 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md"
        >
          Search
        </Button>
      </form>

      {/* Filters: Location */}
      <div
        className="flex flex-col sm:flex-row gap-4 mb-6"
        style={{ borderRadius: "10px" }}
      >
        {/* Location Filter */}
        <Select
          value={location}
          onValueChange={(value) => setLocation(value)}
          className="flex-1"
        >
          <SelectTrigger
            className="bg-white shadow-md border border-gray-300 rounded-lg p-2"
            style={{ borderRadius: "10px" }}
          >
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

        {/* Clear Filters Button */}
        <Button
          className="sm:w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg shadow-md"
          onClick={clearFilters}
          style={{ borderRadius: "10px" }}
        >
          Clear Filters
        </Button>
        <div className="sm:w-1/3 relative">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="bg-blue-600 text-white py-2 px-4 rounded-xl text-center shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer">
            Search with resume
          </div>
        </div>
      </div>

      {/* Job Listings */}
      {loadingJobs && (
        <BarLoader className="mt-4 mx-auto" width={"100%"} color="#36d7b7" />
      )}

      {!loadingJobs && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs?.length ? (
            jobs?.map((job) => (
              <div key={job._id} className="p-4 shadow-lg rounded-lg bg-white">
                <JobCard job={job} />
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-600">
              No jobs found matching your criteria.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;

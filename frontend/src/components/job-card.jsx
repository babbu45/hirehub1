// JobCard.jsx

import { Heart, MapPinIcon } from "lucide-react";
import { Button } from "./ui/button"; // Ensure this is the correct path to your Button component
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"; // Ensure this is the correct path to your Card component
import { Link } from "react-router-dom";
import { useState } from "react";

const JobCard = ({ job, savedInit = false }) => {
  const [saved, setSaved] = useState(savedInit);

  const handleSaveJob = () => {
    setSaved(!saved); // Toggle saved state
  };

  if (!job) {
    return null; // Return if no job data is provided
  }

  const { title, company, location, description } = job;

  return (
    <Card className="flex flex-col shadow-lg mb-6 border border-gray-200 rounded-lg overflow-hidden">
      {/* Job Card Header */}
      <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <CardTitle className="font-bold text-xl">
          {title ? title.substring(0, 50) : "No title available"}
        </CardTitle>
        <div className="flex gap-2 items-center">
          <MapPinIcon size={18} />
          <span>{location || "Unknown location"}</span>
        </div>
      </CardHeader>

      {/* Job Card Content */}
      <CardContent className="flex flex-col gap-4 p-4">
        {/* Company Info */}
        <div className="flex items-center gap-3">
          <img
            src={company?.logo || "/default-company-logo.png"} // Default logo if none is provided
            alt={`${company?.name || "Company"} logo`}
            className="h-12 w-12 object-contain rounded-md border"
          />
          <span className="font-semibold text-lg">
            {company?.name || "Unknown company"}
          </span>
        </div>

        {/* Job Description */}
        <p className="text-gray-600">
          {description
            ? description.substring(0, description.indexOf(".")) + "..."
            : "No description available."}
        </p>
      </CardContent>

      {/* Job Card Footer */}
      <CardFooter className="flex justify-between items-center bg-gray-50 p-4">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="primary" className="w-full">
            More Details
          </Button>
        </Link>
        <div
          onClick={handleSaveJob}
          className="cursor-pointer flex items-center gap-1"
        >
          <Heart size={24} fill={saved ? "red" : "none"} stroke="red" />
          <span>{saved ? "Saved" : "Save"}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;

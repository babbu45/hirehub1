import { Heart, MapPinIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({ job, savedInit = false }) => {
  const [saved, setSaved] = useState(savedInit);

  const handleSaveJob = () => {
    // Save job logic
    setSaved(!saved);
  };

  return (
    <Card className="flex flex-col shadow-lg mb-4">
      <CardHeader className="flex justify-between">
        <CardTitle className="font-bold text-xl">
          {job.title}
        </CardTitle>
        <div className="flex gap-2 items-center">
          <MapPinIcon size={18} />
          <span>{job.location}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center">
          <img
            src={job.company?.logo}
            alt={`${job.company?.name} logo`}
            className="h-10 w-10 object-contain mr-4"
          />
          <span className="font-semibold">{job.company?.name}</span>
        </div>
        <p>{job.description.substring(0, job.description.indexOf("."))}...</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        <div onClick={handleSaveJob} className="cursor-pointer">
  <Heart size={40} fill={saved ? "red" : "none"} stroke="red" />
</div>


      </CardFooter>
    </Card>
  );
};

export default JobCard;

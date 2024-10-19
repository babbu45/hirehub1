// PostJob.jsx

import { useState } from "react";
import axios from "axios"; // Import Axios
import { Input } from "@/components/ui/input"; // Assuming valid imports
import { Button } from "@/components/ui/button";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/apiv1/jobs", {
        title,
        description,
        location,
        link,
        expiry,
      });

      // Handle success (you can redirect or show a success message)
      console.log("Job posted:", response.data);
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setLink("");
      setExpiry("");
    } catch (err) {
      setError("Error posting job");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Input
          type="url"
          placeholder="Job Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <Input
          type="date"
          placeholder="Expiry Date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" variant="blue" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
};

export default PostJob;

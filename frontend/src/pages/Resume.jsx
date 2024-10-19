import React, { useState } from 'react';
import axios from 'axios';

export default function Resume() {
  const [jobDesc, setJobDesc] = useState('');
  const [pdf, setPdf] = useState(null);
  const [generatedReview, setGeneratedReview] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePdfUpload = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleGenerateReview = async () => {
    const formData = new FormData();
    formData.append("jobDescription", jobDesc);
    formData.append("resume", pdf);
    const review = await axios.post("http://localhost:5000/apiv1/generateReview", formData);
    // Assuming review.data.review is already a formatted string or markdown
    setGeneratedReview(review.data.review);
    setIsModalOpen(true); // Open the modal when the review is generated
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br overflow-auto from-gray-50 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg transition-all duration-300 hover:shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Resume Review</h2>
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            rows="3"
            placeholder="Enter job description..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Resume</label>
          <div className="relative w-full">
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-blue-600 text-white py-2 px-4 rounded-xl text-center shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer">
              Choose File
            </div>
            <p>{pdf?.name}</p>
          </div>
        </div>

        <button
          onClick={handleGenerateReview}
          className="w-full bg-black text-white py-3 rounded-xl shadow-md hover:bg-white hover:text-black hover:border hover:border-black "
        >
          Generate Review
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg z-50 relative overflow-y-auto max-h-96">
            <h3 className="text-xl font-bold mb-4">Generated Review</h3>
            <div className="text-gray-700 space-y-4"> {/* Use space-y for spacing between paragraphs */}
              {/* Properly format the content */}
              {generatedReview.split('*').map((item, index) => (
                <p key={index}>{item.trim()}</p>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

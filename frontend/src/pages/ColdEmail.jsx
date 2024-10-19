import React, { useState } from 'react';
import axios from 'axios';

function ColdEmailGenerator() {
  const [companyDesc, setCompanyDesc] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [pdf, setPdf] = useState(null);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePdfUpload = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleGenerateEmail = async () => {
    const formData = new FormData();
    formData.append("companyDescription", companyDesc);
    formData.append("jobDescription", jobDesc);
    formData.append("resume", pdf);
    const email = await axios.post("http://localhost:5000/apiv1/generateEmail", formData);

    setGeneratedEmail(`${email.data.email}`);
    setIsModalOpen(true); // Open modal when the email is generated
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    alert("Email copied to clipboard!");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg transition-all duration-300 hover:shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Cold Email Generator</h2>
        
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Description</label>
          <textarea
            value={companyDesc}
            onChange={(e) => setCompanyDesc(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            rows="3"
            placeholder="Enter company description..."
          />
        </div>

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
          onClick={handleGenerateEmail}
          className="w-full bg-black text-white py-3 rounded-xl shadow-md hover:bg-white hover:text-black hover:border hover:border-black "
        >
          Generate Cold Email
        </button>
      </div>

      {/* Modal for showing the generated email */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto relative">
            {/* Close and Copy Icons */}
            <div className="absolute top-2 right-2 flex space-x-4 m-2">
              {/* Close Button */}
              <button onClick={copyToClipboard} className="text-gray-500  hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8m-4-4h4m1 8h-6a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Copy to Clipboard Button */}
              
            </div>

            <h3 className="text-xl font-bold mb-4">Generated Cold Email</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{generatedEmail}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColdEmailGenerator;

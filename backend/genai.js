const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generateColdEmail(resumeData, companyInfo, jobDescription) {
  const coldEmailPrompt = `
    Draft a professional and personalized cold email using the following steps. Make sure to craft a concise, engaging message that grabs attention and highlights the candidate's strengths. Follow these guidelines:
Personalize it: Customize the email for the recipient, referencing their work or the company’s achievements. Mention specific details about the company or role to show that research has been done.
Craft a compelling introduction: Write a clear and intriguing subject line that sparks curiosity or addresses a pain point. Start the email with a concise and engaging introduction of the candidate, keeping it friendly and to the point.
Provide clear information and value: Highlight the candidate’s key strengths and achievements relevant to the role. Use concrete examples or success stories to show how they can provide value to the recipient’s company. Keep the message focused and free of jargon.
Ask for what you want: End the email with a strong call to action, asking for a meeting or collaboration.
Sign off professionally: Close the email with a friendly and professional tone, maintaining a balance between formal and approachable.
Use the following details to generate the cold email:

Resume Information: ${resumeData}
Company Information: ${companyInfo}
Job Description: ${jobDescription}
  `;
  // console.log(coldEmailPrompt);
  const result = await model.generateContent(coldEmailPrompt);
  const response = await result.response;
  return response.text();
}

async function reviewResume(resumeData,jobDescription) {
  const resumeReviewPrompt = `
    Analyze the following resume and provide recommendations specific to job description given below for improvement. 
    Focus on optimizing the resume for better readability, ATS compliance, and alignment with industry standards. 
    Highlight areas where skills, achievements, or wording can be improved. 
    job description: ${jobDescription}
    Resume details: ${resumeData}

  `;
  const result = await model.generateContent(resumeReviewPrompt);
  const response = await result.response;
  return response.text();
  // console.log(response.text());
}

async function suggestJobs(resumeData) {
  const relatedJobPrompt = `
  Based on the following resume details, suggest a list of relevant job roles that align with the candidate's certifications, completed projects, technologies used, field of study, achievements, and previous work experience. 
  Consider roles that would suit the candidate's technical and academic background. give all the fields in form of an array and then generate the response.
  Resume details: ${resumeData}
`;

  const result = await model.generateContent(relatedJobPrompt);
  const response = await result.response;
  const jobs = response.text();
  console.log("jobs", jobs);
  jobsArray = jobs.split("\n").map((job) => job.trim());
  console.log("jobs", jobsArray); 
  // console.log(response.text());
  // return response.text();
  return jobsArray;
}

module.exports = { generateColdEmail, reviewResume, suggestJobs };

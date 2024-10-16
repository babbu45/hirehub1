const mockJobsData = {
  jobs: [
    {
      id: "1",
      title: "Software Engineer",
      company: {
        name: "Google",
        logo: "public/companies/google.webp", // Google logo
      },
      location: "Bangalore, India",
      description: "Join our team as a Software Engineer and work on innovative projects.",
      requirements: [
        "Bachelor's degree in Computer Science or a related field.",
        "3+ years of experience in software development using Java, Python, or C++.",
        "Strong knowledge of data structures, algorithms, and software design patterns.",
        "Experience with cloud services (GCP, AWS, or Azure) and containerization (Docker, Kubernetes).",
        "Excellent problem-solving skills and the ability to work in a collaborative environment.",
      ],
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: {
        name: "Facebook",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", // Facebook logo
      },
      location: "Hyderabad, India",
      description: "We are looking for a Frontend Developer to create amazing user interfaces.",
      requirements: [
        "Proven experience as a Frontend Developer, with expertise in JavaScript, HTML5, and CSS3.",
        "Experience with modern JavaScript frameworks such as React, Angular, or Vue.js.",
        "Familiarity with responsive design principles and tools like Tailwind CSS or Bootstrap.",
        "Understanding of version control systems like Git and code collaboration workflows.",
        "Strong attention to detail and a passion for building user-friendly web applications.",
      ],
    },
    {
      id: "3",
      title: "Backend Developer",
      company: {
        name: "Netflix",
        logo: "public/companies/netflix.png", // Netflix logo
      },
      location: "Mumbai, India",
      description: "As a Backend Developer, you will be responsible for server-side logic.",
      requirements: [
        "5+ years of experience in backend development using Node.js, Python, or Java.",
        "Proficiency in building and scaling RESTful APIs and microservices architectures.",
        "Familiarity with databases (SQL/NoSQL) such as PostgreSQL, MongoDB, or Redis.",
        "Experience with cloud computing platforms such as AWS, Google Cloud, or Azure.",
        "Strong problem-solving abilities and attention to security and performance.",
      ],
    },
    {
      id: "4",
      title: "Product Manager",
      company: {
        name: "Amazon Web Services",
        logo: "public/companies/amazon.svg", // AWS logo
      },
      location: "Pune, India",
      description: "Seeking a Product Manager to drive product development.",
      requirements: [
        "Bachelor's degree in Business, Marketing, or a related field.",
        "4+ years of experience in product management with a focus on cloud technologies.",
        "Strong understanding of agile methodologies and experience leading cross-functional teams.",
        "Ability to define product strategy, roadmaps, and translate business needs into technical requirements.",
        "Excellent communication and leadership skills with a data-driven mindset.",
      ],
    },
    {
      id: "5",
      title: "Data Scientist",
      company: {
        name: "Apple",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", // Apple logo
      },
      location: "Chennai, India",
      description: "Looking for a Data Scientist to analyze data and provide insights.",
      requirements: [
        "Master's degree in Data Science, Statistics, or a related field.",
        "3+ years of experience in data analysis, machine learning, and statistical modeling.",
        "Proficiency in programming languages like Python, R, and SQL.",
        "Experience with data visualization tools like Tableau, Power BI, or Matplotlib.",
        "Strong analytical thinking and ability to communicate insights to both technical and non-technical stakeholders.",
      ],
    },
  ],
};

export default mockJobsData;

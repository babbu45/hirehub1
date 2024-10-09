import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app.layout";
import LandingPage from "./pages/landing";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listings";
import JobPage from "./pages/job";
import PostJob from "./pages/post-job";
import SavedJobs from "./pages/save-jobs";
import MyJobs from "./pages/my-jobs";
import './App.css'; // Ensure this file exists and Tailwind CSS is properly imported

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <JobPage />,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/saved-job",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ],
  },
]);

function App() {
  return (
    
      <RouterProvider router={router} />
    
  );
}

export default App;

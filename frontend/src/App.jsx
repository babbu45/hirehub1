import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app.layout";
import LandingPage from "./pages/landing";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listings";
import JobPage from "./pages/job";
import PostJob from "./pages/post-job";
import SavedJobs from "./pages/saved-jobs";
import MyJobs from "./pages/my-jobs";
import './App.css'; // Ensure this file exists and Tailwind CSS is properly imported
import ProtectedRoute from "./components/protectedroute";

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
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>

        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>

        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>

        ),
      },
      {
        path: "/onboarding",
        element: 
        (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>

        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>

        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>

        ),
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

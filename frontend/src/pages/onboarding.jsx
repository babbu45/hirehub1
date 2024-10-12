import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";



const Onboarding = () => {
  const {user,isLoaded}=useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if(! isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="black" />;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        Welcome to hirehub!
        
      </h2>
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        Choose what you are
        
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button variant="blue" className="h-36 rounded-full" text-2xl onClick={() => handleRoleSelection("candidate")} >
          Candidate
        </Button>
        <Button variant="red" className="h-36 rounded-full" text-2xl onClick={() => handleRoleSelection("recruiter")}>
          Recruiter
        </Button>
      
      </div> 

    </div>
  )
}

export default  Onboarding 
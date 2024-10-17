import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch"; // Hook for API requests
import { applyToJob } from "@/api/apiApplicatios"; // Mock API for applying to job

// Define form validation schema using Zod
const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export function ApplyJobDrawer({ user, job, applied = false, fetchJob }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Use your hook to manage the API call (to mock data)
  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0], // Handle resume file upload
    }).then((response) => {
      if (response.status === 200) {
        fetchJob(); // Refresh the job data
        reset(); // Reset the form after submission
      } else {
        console.error(response.message);
      }
    });
  };

  return (
    <div className="flex flex-col">
      {!applied && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          {/* Experience Input */}
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}

          {/* Skills Input */}
          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1"
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}

          {/* Education Radio Group */}
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post Graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}

          {/* Resume Upload Input */}
          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="flex-1 file:text-gray-500"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}

          {/* Display errors and loading spinner */}
          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )}
          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}

          {/* Submit Button */}
          <Button type="submit" variant="blue" size="lg">
            Apply
          </Button>
        </form>
      )}
    </div>
  );
}


import { CreateSurveyDialog } from "@/components/forms/create-survey-form";
import { DeleteSurveyDialog } from "@/components/forms/delete-survey-form";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex justify-center items-center space-x-5 ">
        <div>
          <CreateSurveyDialog />
        </div>
        <div>
          <DeleteSurveyDialog />
        </div>
      </div>
    </main>
  );
}
export default Home;

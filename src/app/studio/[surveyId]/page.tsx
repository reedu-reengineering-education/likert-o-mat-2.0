import React from "react";
import CreateQuestionDialog from "@/components/forms/create-question-form";
import { ListQuestions } from "@/components/forms/setting-forms/questionList";

export default function Studio({ params }: { params: { surveyId: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex">
          <h4 className="text-2xl flex mb-8 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {"Meine Fragen "}
          </h4>

          <div className="mt-24">
            <ListQuestions surveyId={params.surveyId} />
          </div>
        </div>
        <div className="flex mb-96">
          <CreateQuestionDialog surveyId={params.surveyId} />
        </div>
      </div>
    </main>
  );
}

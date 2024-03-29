"use client";
import React, { useEffect, useState } from "react";
import { Survey } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  ShareIcon,
  QrCodeIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import ButtonActions from "@/components/buttons/buttonsActions";
import { userSurveys } from "@/lib/api/surveyClient";
import { useRouter } from "next/navigation";

export function ListSurvey() {
  const [survey, setSurvey] = useState<Survey[]>([]);
  const { handleDelete } = ButtonActions();

  const router = useRouter();

  const handleEdit = (surveyId: string) => {
    try {
      console.log("surveyId", surveyId);
      router.push(`/studio/${surveyId}`);
    } catch (error) {
      console.error("Error when reading the survey:", error);
    }
  };

  useEffect(() => {
    userSurveys()
      .then(setSurvey)
      .catch((error) => console.error(error));
  }, []);

  const onDeleteSuccess = (deletedSurveyId: String) => {
    setSurvey(() => survey.filter((s) => s.id !== deletedSurveyId));
  };

  return (
    <div>
      {survey.map((survey) => (
        <div key={survey.id} className="mt-4 p-4 shadow rounded-lg bg-white">
          <p className="mb-4 text-lg font-semibold">{survey.name}</p>

          <div className="flex space-x-2 mt-3">
            <Button variant="outline" onClick={() => handleEdit(survey.id)}>
              <PencilIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Edit
            </Button>
            <Button variant="outline">
              <ShareIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Edit
            </Button>
            <Button variant="outline">
              <QrCodeIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                handleDelete(survey.id, onDeleteSuccess);
              }}
            >
              <TrashIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};



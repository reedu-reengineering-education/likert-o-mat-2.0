import axios from "axios";

export async function createSurvey(name: String) {
  const apiUrl = `/api/survey`;

  try {
    const response = await axios.post(apiUrl, { name });
    const crateSurvey = response.data;
    return crateSurvey;
  } catch (error) {
    console.error("Error when creating the survey:", error);
    throw error;
  }
}

export default createSurvey;

export async function readSurvey(surveyId: String) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    const response = await axios.get(apiUrl);
    const getSurvey = response.data;
    return getSurvey;
  } catch (error) {
    console.error("Error when requesting the survey:", error);
    throw error;
  }
}

export async function updateSurvey(surveyId: String, name: String) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    const response = await axios.put(apiUrl, { name });
    const updateSurvey = response.data;
    return updateSurvey;
  } catch (error) {
    console.error("Error when updating the survey:", error);
    throw error;
  }
}

export async function deleteSurvey(surveyId: String) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    const response = await axios.delete(apiUrl);
    const deleteSurvey = response.data;
    return deleteSurvey;
  } catch (error) {
    console.error("Error when deleting the survey:", error);
    throw error;
  }
}

export async function userSurveys() {
  const apiUrl = `/api/survey`;

  try {
    const response = await axios.get(apiUrl);
    const surveyList = response.data;
    return surveyList;
  } catch (error) {
    console.error("Error when requesting the survey:", error);
    throw error;
  }
}

export async function surveyQuestions(surveyId: String) {
  const apiUrl = `/api/question/survey/${surveyId}`;

  try {
    const response = await axios.get(apiUrl);
    const questionList = response.data;
    return questionList;
  } catch (error) {
    console.error("Error when requesting the questions:", error);
    throw error;
  }
}

import { port } from '../types';

// Fetch the Questionnaire from API by Id
export const getQuestionnaireById = async (id: number) => {
  const url = `http://localhost:${port}/questionnaires/?id=${id}`;
  const response = await fetch(url);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result + response.statusText);
  }
  return {
    result,
  };
};

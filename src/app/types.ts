import { atom } from 'jotai';

export type MultipleChoiceData = {
  id: string;
  title: string;
  type: AnswerType;
};

export type QuestionData = {
  questionId: number;
  questionText: string;
  required: boolean;
  questionType: QuestionType;
  multipleChoiceAnswers: MultipleChoiceData[];
  textAnswerPlaceHolder: string;
  conditions: { [id: number]: string | undefined };
};

export type QuestionnaireData = {
  id: number;
  title: string;
  subtitle: string;
  questions: QuestionData[];
};

export enum QuestionType {
  'MultipleChoice',
  'Text',
}

export enum AnswerType {
  'Choice',
  'ChoiceWithText',
}

export const formInput = atom({} as { [id: number]: string | undefined });
export const notificationVisible = atom(false as boolean);
export const questionnaire = atom(null as QuestionnaireData | null);
export const questionnaireId = 1;
export const port = 3000;

/* eslint-disable @next/next/no-img-element */
'use client';
import { useAtom } from 'jotai';
import Card from './components/Card';
import TitleCard from './components/TitleCard';
import Notification from './components/Notification';
import {
  AnswerType,
  QuestionType,
  formInput,
  notificationVisible,
  questionnaire,
  questionnaireId,
} from './types';
import { useEffect } from 'react';
import { getQuestionnaireById } from './fetchers/fetchQuestionnaire';

// const questionnaire1 = {
//   id: 1,
//   title: 'GoTech Questionnaire',
//   subtitle: 'Show me what you got!',
//   questions: [
//     {
//       questionId: 1,
//       questionText: 'What language is your favorite?',
//       required: true,
//       questionType: QuestionType.MultipleChoice,
//       multipleChoiceAnswers: [
//         { id: 'JavaScript', title: 'JavaScript', type: AnswerType.Choice },
//         { id: 'TypeScript', title: 'TypeScript', type: AnswerType.Choice },
//         { id: 'CoffeeScript', title: 'CoffeeScript', type: AnswerType.Choice },
//       ],
//       textAnswerPlaceHolder: '',
//       conditions: {},
//     },
//     {
//       questionId: 2,
//       questionText: 'Why do you like TypeScript?',
//       required: false,
//       questionType: QuestionType.Text,
//       multipleChoiceAnswers: [],
//       textAnswerPlaceHolder: 'Your answer',
//       conditions: { 1: 'TypeScript' },
//     },
//     {
//       questionId: 3,
//       questionText: 'What do you like about programming?',
//       required: false,
//       questionType: QuestionType.Text,
//       multipleChoiceAnswers: [],
//       textAnswerPlaceHolder: 'Your answer',
//       conditions: {},
//     },
//     {
//       questionId: 4,
//       questionText: 'How was the assignment?',
//       required: true,
//       questionType: QuestionType.MultipleChoice,
//       multipleChoiceAnswers: [
//         { id: 'Easy', title: 'Easy', type: AnswerType.Choice },
//         { id: 'Normal', title: 'Normal', type: AnswerType.Choice },
//         { id: 'Hard', title: 'Hard', type: AnswerType.Choice },
//         { id: 'Other', title: 'Other', type: AnswerType.ChoiceWithText },
//       ],
//       textAnswerPlaceHolder: '',
//       conditions: {},
//     },
//   ],
// };
export default function Home() {
  const [input, setInput] = useAtom(formInput);
  const [visible, setVisible] = useAtom(notificationVisible);
  const [questionnaireData, setQuestionnaireData] = useAtom(questionnaire);

  const loading = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-1/5 h-1/5 transform rotate-180 animate-spin'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
      />
    </svg>
  );

  // Fetching the data from API
  useEffect(() => {
    getQuestionnaireById(questionnaireId)
      .then((q) => {
        setQuestionnaireData(q.result[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here goes the code for submitting the form. Wasn't in the scope of this assignment.
    //.......
    setVisible(true);
  };

  // If the question should only show in case a certain answer was given to other question,
  // check that this condition is true. Feature from the BONUS part of the assignment.
  const checkConditions = (conditions: {
    [id: number]: string | undefined;
  }) => {
    let result = true;
    Object.keys(conditions).forEach((q) => {
      if (input[+q] !== conditions[+q]) result = false;
    });
    return result;
  };
  console.log(questionnaireData);
  return (
    <form onSubmit={handleSubmit}>
      {visible && (
        <Notification
          title='Submitted successfully!'
          subtitle='Thank you for answering the questions!!'
        />
      )}

      <ul role='list' className='grid grid-cols-1 gap-5 mt-10 mx-20'>
        <li
          key={0}
          className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'
        >
          {!questionnaireData && (
            <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mr-4 flex self-center'>
              {loading}
            </div>
          )}
          {questionnaireData && (
            <TitleCard
              title={questionnaireData.title}
              subtitle={questionnaireData.subtitle}
            />
          )}
        </li>

        {questionnaireData &&
          questionnaireData.questions.map((question) => {
            return (
              checkConditions(question.conditions) && (
                <li
                  key={question.questionId}
                  className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'
                >
                  <Card
                    questionId={question.questionId}
                    questionText={question.questionText}
                    required={question.required}
                    questionType={question.questionType}
                    multipleChoiceAnswers={question.multipleChoiceAnswers}
                    textAnswerPlaceHolder={question.textAnswerPlaceHolder}
                  />
                </li>
              )
            );
          })}
        <div className='mb-6 flex items-center justify-end gap-x-6'>
          <button
            type='submit'
            className='rounded-md bg-cyan-500 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700'
          >
            Submit
          </button>
        </div>
      </ul>
    </form>
  );
}

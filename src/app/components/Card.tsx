import { useAtom } from 'jotai';
import { AnswerType, QuestionType, formInput } from '../types';

type CardProps = {
  questionId: number;
  questionText: string;
  required: boolean;
  questionType: QuestionType;
  multipleChoiceAnswers: { id: string; title: string; type: AnswerType }[];
  textAnswerPlaceHolder: string;
};

// Component for showing any question in the questionnaire

const Card = ({
  questionId,
  questionText,
  required,
  questionType,
  multipleChoiceAnswers,
  textAnswerPlaceHolder,
}: CardProps) => {
  const [values, setValue] = useAtom(formInput);
  const handleChange = ({ target: { name, value } }: any) => {
    setValue({
      ...values,
      [name]: value,
    });
  };
  const handleSelect = ({ target: { name, id } }: any) => {
    setValue({
      ...values,
      [name]: id,
    });
  };

  return (
    <div className='flex w-full items-center justify-between space-x-6 p-6'>
      <div className='bg-white px-4 py-5 sm:px-6'>
        <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          {/* In case the Question is of type Text */}
          {questionType === QuestionType.Text && (
            <div className='ml-4 mt-4'>
              <label className='block text-base font-medium leading-6 text-gray-900'>
                {questionText}
                {required && <span className='text-sm  text-red-500'>*</span>}
              </label>
              <div className='mt-2 border-b border-gray-300'>
                <textarea
                  rows={1}
                  name={`${questionId}`}
                  id={`${questionId}`}
                  className='block w-full resize-none border-0 border-b border-transparent p-0 pt-3 pl-1.5  text-gray-900 placeholder:text-gray-400 placeholder:text-xs focus:ring-0 sm:text-sm sm:leading-6'
                  defaultValue={''}
                  placeholder={textAnswerPlaceHolder}
                  onChange={handleChange}
                  required={required}
                />
              </div>
            </div>
          )}

          {/* In case the Question is of type Multiple choice */}
          {questionType === QuestionType.MultipleChoice && (
            <div className='ml-4 mt-4'>
              <label className='block text-base font-medium leading-6 text-gray-900'>
                {questionText}
                {required && <span className='text-sm  text-red-500'>*</span>}
              </label>
              <fieldset className='mt-4'>
                <div className='space-y-4'>
                  {multipleChoiceAnswers.map((answer) => (
                    <div key={answer.id} className='flex items-center'>
                      <input
                        id={answer.id}
                        name={`${questionId}`}
                        type='radio'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        onChange={handleSelect}
                        required={required}
                      />
                      <label
                        htmlFor={answer.id}
                        className='ml-3 block text-sm font-medium leading-6 text-gray-900'
                      >
                        {answer.title}
                      </label>

                      {/* In case the Multiple choice question also includes an option with Text input (Other..) */}
                      {answer.type === AnswerType.ChoiceWithText && (
                        <div className='ml-4 border-b border-gray-300'>
                          <textarea
                            rows={1}
                            name={`${questionId}`}
                            id={`${questionId}`}
                            className='block w-full resize-none border-0 border-b border-transparent p-0 pl-1.5 text-gray-900 placeholder:text-gray-400 placeholder:text-xs focus:ring-0 sm:text-sm sm:leading-6'
                            defaultValue={''}
                            placeholder={textAnswerPlaceHolder}
                            onChange={handleChange}
                            required={
                              required && values[questionId] === answer.id
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

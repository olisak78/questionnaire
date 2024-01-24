type TitleCardProps = {
  title: string;
  subtitle: string;
};

// Component for showing ONLY the title of the questionnaire

const TitleCard = ({ title, subtitle }: TitleCardProps) => {
  return (
    <div className='flex w-full items-center justify-between space-x-6 p-6 border-t-8 border-cyan-500 rounded-lg'>
      <div className='bg-white px-4 py-5 sm:px-6'>
        <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-4'>
            <h3 className='text-xl font-semibold leading-6 text-gray-900'>
              {title}
            </h3>
            <p className='mt-2 text-sm text-gray-600'>{subtitle}</p>
            <p className='mt-3 text-xs  text-red-500'>* Required</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;

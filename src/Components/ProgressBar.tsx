import React, { ReactNode } from 'react';

type StepProps = {
  completed: boolean;
  children: ReactNode;
  isLastStep?: boolean;
};

const Step: React.FC<StepProps> = ({
  completed,
  children,
  isLastStep = false,
}) => (
  <div
    className={`flex items-center ${isLastStep ? 'w-1/6 sm:w-16' : 'w-full'}`}
  >
    <div
      className={`flex-shrink-0 p-1 -ml-4 flex items-center justify-center rounded-full ${
        completed ? 'bg-green-600' : 'bg-gray-300'
      } w-1/6 h-1/6 sm:w-16 sm:h-16`}
    >
      {children}
    </div>
    {!isLastStep && <div className="flex-grow h-1 bg-red-600 sm:h-2"></div>}
  </div>
);

const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-full fill-current text-white"
    viewBox="0 0 24 24"
  >
    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
  </svg>
);
const TOTAL_STEPS = 4; // Ahora hay 4 pasos, el último para mostrar el mensaje

const ProgressBar: React.FC = () => {
  const [step, setStep] = React.useState(1);

  const handleNextStep = () =>
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      {step < TOTAL_STEPS ? (
        <>
          <div className="flex items-center justify-center m-auto space-x-4">
            {[...Array(TOTAL_STEPS - 1).keys()].map((_, index) => (
              <Step
                key={index}
                completed={step > index}
                isLastStep={index === TOTAL_STEPS - 2} // Nota que el último step será el TOTAL_STEPS - 2 ahora
              >
                <CheckIcon />
              </Step>
            ))}
          </div>
          <div className="my-8 flex  justify-center space-x-2">
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className={`py-2 px-4 w-32 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                  ${
                    step === 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
            >
              Previous
            </button>

            <button
              onClick={handleNextStep}
              disabled={step === TOTAL_STEPS}
              className={`py-2 px-4 w-32 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                  ${
                    step === TOTAL_STEPS
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h2 className="text-2xl text-gray-700  font-bold transition-opacity duration-700 opacity-100 text-center 🚘">
          Reparaciones finalizadas con exito 🛻
        </h2>
      )}
    </>
  );
};

export default ProgressBar;

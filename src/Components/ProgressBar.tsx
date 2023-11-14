import React, { ReactNode, useEffect, useState } from 'react';
import { FaCarCrash } from 'react-icons/fa';

import { ImHammer } from 'react-icons/im';
import { HiOutlineCheck } from 'react-icons/hi';
import { SuccessModal } from 'src/utils/Modal';
import { useUserContext } from 'src/context/Context';
import { TokenExists } from 'src/utils/Token';

type StepProps = {
  completed: boolean;
  children: ReactNode;
  isLastStep?: boolean;
  title: string;
};
const Step: React.FC<StepProps> = ({
  completed,
  children,
  isLastStep = false,
  title,
}) => (
  <div className={`flex items-center ${isLastStep ? 'flex-none' : 'w-full'}`}>
    <div className="flex flex-col items-center relative z-10 flex-shrink-0">
      <div
        className={`flex items-center justify-center rounded-full ${
          completed ? 'bg-green-600' : 'bg-gray-300'
        } w-1/6 h-1/6 sm:w-16 sm:h-16`}
      >
        {children}
      </div>
      <div className="text-center font-semibold text-1xl text-gray">
        {title}
      </div>
    </div>
    <div
      className={`h-1 ${
        !isLastStep ? 'flex-grow bg-red-600' : 'w-0 bg-transparent'
      } sm:h-2`}
    ></div>
  </div>
);

const TOTAL_STEPS = 4; // 4 pasos en total

const ProgressBar: React.FC = () => {
  const [step, setStep] = useState(1);
  const { status, setStatus } = useUserContext();

  const token = TokenExists();

  useEffect(() => {
    if (status !== step) {
      setStep(status);
    }
  }, [status]);

  const handleNextStep = () => {
    let newStep;
    if (step === TOTAL_STEPS - 1) {
      newStep = TOTAL_STEPS;
    } else {
      newStep = Math.min(step + 1, TOTAL_STEPS);
    }
    setStep(newStep);
    setStatus(newStep); // Actualizar el status en el contexto
  };

  const handlePrevStep = () => {
    const newStep = Math.max(step - 1, 1);
    setStep(newStep);
    setStatus(newStep); // Actualizar el status en el contexto
  };

  const stepTitles = [
    'Inicio de reparaciones',
    'Realizando reparaciones',
    'Reparaciones finalizadas',
  ];
  const stepIcons = [
    <FaCarCrash className="w-8 h-8 m-0" />,
    <ImHammer className="w-8 h-8 m-0" />,
    <HiOutlineCheck className="w-8 h-8 m-0" />,
  ];

  return (
    <>
      <div className="flex items-center justify-center m-auto space-x-4">
        {[...Array(TOTAL_STEPS - 1).keys()].map((_, index) => (
          <Step
            key={index}
            completed={step > index}
            isLastStep={index === TOTAL_STEPS - 2}
            title={stepTitles[index]}
          >
            {stepIcons[index]}
          </Step>
        ))}
      </div>
      {token && step < TOTAL_STEPS && (
        <div className="mt-16 flex justify-center items-center space-x-2">
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

          {step === TOTAL_STEPS - 1 ? (
            <button
              onClick={handleNextStep}
              className="py-2 px-4 w-32 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirmar
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              className={`py-2 px-4 w-32 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                  ${
                    step === TOTAL_STEPS - 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
            >
              Next
            </button>
          )}
        </div>
      )}
      {step >= TOTAL_STEPS && (
        <SuccessModal text={'Reparacion hecha con exito'} />
      )}
    </>
  );
};

export default ProgressBar;

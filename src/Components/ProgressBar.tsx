import React, { ReactNode } from 'react';

type ProgressBarProps = {
  step: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="flex items-center justify-center m-auto space-x-4">
      <Step completed={step >= 1} isLastStep={step === 3}>
        <CheckIcon />
      </Step>
      <Step completed={step >= 2} isLastStep={step === 3}>
        <CheckIcon />
      </Step>
      <Step completed={step >= 3} isLastStep={true}>
        <CheckIcon />
      </Step>
    </div>
  );
};

type StepProps = {
  completed: boolean;
  children: ReactNode;
  isLastStep?: boolean; // Optional prop to specify if this is the last step
};

const Step: React.FC<StepProps> = ({
  completed,
  children,
  isLastStep = false,
}) => {
  return (
    <div
      className={`flex items-center ${
        isLastStep ? ' w-1/6 sm:w-16' : 'w-full'
      }`}
    >
      <div
        className={`flex-shrink-0 p-1  -ml-4 flex items-center justify-center rounded-full ${
          completed ? 'opacity-100' : 'opacity-50'
        } bg-blue-600 w-1/6 h-1/6 sm:w-16 sm:h-16`}
      >
        {children}
      </div>
      {/* Render horizontal bar only if it's not the last step */}
      {!isLastStep && (
        <div className="flex-grow h-1  bg-orange-600 sm:h-2"></div>
      )}
    </div>
  );
};

const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-full fill-white"
    viewBox="0 0 24 24"
  >
    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
  </svg>
);

export default ProgressBar;

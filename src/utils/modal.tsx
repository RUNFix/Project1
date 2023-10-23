import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InvalidCredentialsModal() {
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleRedirect = () => {
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    navigate('/home');
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none border-radius rounded-3xl animate-jump-in animate-once animate-delay-[10ms]">
        <div className="relative w-auto my-6 mx-auto max-w-md">
          <div className="border-0 rounded-xl shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t-xl bg-red-500">
              <h3 className="text-3xl font-semibold">Credenciales Inválidas</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Las credenciales proporcionadas no son válidas. Por favor,
                intenta nuevamente.
              </p>
            </div>
            <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b-xl">
              <button
                className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleRedirect}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export function LoadingModal() {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animate-jump-in animate-twice animate-delay-[15ms] ">
        <div className="text-cente">
          <div role="status">
            <svg
              aria-hidden="true4"
              className="inline w-16 h-16 text-gray-200 animate-spin fill-blue-900"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
        ;
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export function SuccessModal({ text }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animate-jump-in animate-once   animate-delay-[15ms]">
        <div className="relative w-96 my-6 mx-auto">
          <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center p-5">
              <span className="flex items-center justify-center bg-green-500 text-white text-5xl h-16 w-16 rounded-full">
                ✓
              </span>
            </div>
            <div className="relative p-6 flex-auto">
              <h3 className="text-center text-2xl font-semibold mb-4">
                Operacion exitosa
              </h3>
              <p className="my-4 text-gray-600 text-lg leading-relaxed text-center">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export function ErrorModal({ text }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animate-wiggle animate-twice animate-delay-[15ms]">
        <div className="relative w-96 my-6 mx-auto">
          <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center p-5">
              <span className="flex items-center justify-center bg-red-500 text-white text-5xl h-16 w-16 rounded-full">
                ✗
              </span>
            </div>
            <div className="relative p-6 flex-auto">
              <h3 className="text-center text-2xl font-semibold mb-4">
                Operacion exitosa
              </h3>
              <p className="my-4 text-gray-600 text-lg leading-relaxed text-center">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

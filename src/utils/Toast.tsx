import toast from 'react-hot-toast';

// This should be a function declaration or a constant initialized with a function.
export const logUserToast = (name: string, position: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
    >
      <div className="flex-1 w-0 p-4 ">
        <div className="flex items-start ">
          <div className="flex-shrink-0 pt-0.5 ">
            <img
              className="h-10 w-10 rounded-full"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQWXRgIf4paZOsYrhk1ZUMEAiEih7aKj36UOAmfmuuGxEvxBA2v"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="mt-1 text-sm text-gray-500">{position}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  ));
};

// If you want to use 'errorToast', export it like this:
export const errorToast = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
    iconTheme: {
      primary: '#FA201D',
      secondary: '#FFF',
    },
    style: {
      border: '3px solid #1e293b',
      color: '1e293b',
    },
  });
};

export const succesToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-center',
    iconTheme: {
      primary: '#49f770',
      secondary: '#FFF',
    },
    style: {
      border: '3px solid #1e293b',
      color: '1e293b',
    },
  });
};

export const notNumberToast = (field: string) => {
  const message = `El campo ${field} debe ser un valor númerico`;
  errorToast(message);
};

export const notValidToast = (field: string) => {
  const message = `El valor en el campo ${field} no es valido`;
  errorToast(message);
};

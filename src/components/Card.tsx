import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  description?: string;
  img: string;
  showDetails: boolean;
  screen?: string;
};

export default function Card({
  title,
  description,
  img,
  showDetails,
  screen,
}: Props) {
  const Element = showDetails ? 'div' : 'button';
  const navigate = useNavigate();

  const handlebutton = () => {
    if (screen === 'register-employee') {
      navigate('/employee-register');
    }
    if (screen === 'tableEmployee') {
      navigate('/employee-table');
    }
    if (screen === 'password-change') {
      navigate('/password-change');
    }
    if (screen === 'vehicle') {
      navigate('/vehicle');
    }
  };

  return (
    <Element
      className="max-w-sm  overflow-hidden shadow-lg transform hover:scale-110 
    transition-transform duration-300 text-azul bg-slate-800 rounded-2xl


    text-white
    hover:shadow-lg 
    rounded0  mt-2"
      onClick={handlebutton}
    >
      <img
        className="mb-2 overflow-hidden w-full h-60 max-w-full max-h-60 sm:max-h-80"
        src={img}
        alt="Placeholder image"
      />

      <div className='p-5'>
      <h2 className="text-xl mb-1 sm:text-lg lg:text-xl p-2 font-bold">{title}</h2>
      <hr className="mb-1" />

      {showDetails ? (
        <div>
          <p className="text-justify mb-2 p-1">{description}</p>
          <button
            className="bg-morado  backdrop: hover:bg-green-500 text-white p-2 rounded ml-2 "
            onClick={() => navigate('/vehicle')}
          >
            Leer más
          </button>
        </div>
      ) : (
        ''
      )}

      </div>
      
    </Element>
  );
}

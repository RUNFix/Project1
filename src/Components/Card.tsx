import React from 'react';
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
      navigate('/register-employee');
    }
    if (screen === 'tableEmployee') {
      navigate('/table-employee');
    }
    if (screen === 'login') {
      navigate('/login');
    }
    if (screen === 'home') {
      navigate('/home');
    }
  };

  return (
    <Element
      className="card rounded-3xl shadow-lg p-2 bg-slate-200 transform hover:scale-105 
    transition-transform duration-300 
    hover:rotate-3 
    hover:bg-slate-800
    hover:text-slate-50  
    hover:shadow-lg 
    rounded0 border-8 border-neutral-300 mt-2"
      onClick={handlebutton}
    >
      <img
        className="mb-2 rounded-2xl border-4 w-full h-auto max-w-full max-h-60 sm:max-h-80"
        src={img}
        alt="Placeholder image"
      />
      <h2 className="text-xl mb-1 sm:text-lg lg:text-xl p-2">{title}</h2>
      <hr className="mb-1" />

      {showDetails ? (
        <div>
          <p className="text-justify mb-2 p-1">{description}</p>
          <button className="bg-blue-500  backdrop: hover:bg-green-500 text-white p-1 rounded ml-2 ">
            Leer más
          </button>
        </div>
      ) : (
        ''
      )}
    </Element>
  );
}

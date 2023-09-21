import React from 'react';

type Props = {
  title: string;
  description: string;
};

export default function Card({ title, description }: Props) {
  return (
    <div
      className="card rounded-3xl shadow-lg p-4 bg-slate-200 transform hover:scale-105 focus:scale-105 
    transition-transform duration-300 
    hover:rotate-3 focus:rotate-3 
    hover:bg-slate-800 focus:bg-blue-500 
    hover:text-slate-50 foscus:text-white 
    hover:shadow-lg focus:shadow-lg 
    rounded0"
    >
      <img
        className="w-full h-48 object-cover mb-4 rounded"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRPUHcpF5-Puip-OwsmM6i1YN3yg6G5OvTLg&usqp=CAU"
        alt="Placeholder image"
      />
      <h2 className="text-2xl mb-2">{title}</h2>
      <p className="text-justify mb-4">{description}</p>
      <button className="bg-blue-500  hover:bg-green-500 text-white p-2 rounded">
        Leer más
      </button>
    </div>
  );
}

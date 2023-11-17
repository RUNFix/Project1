import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-slate-800 text-gray-50 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <span>RUNFIX™</span> © 2023
        </div>
        <div className="flex space-x-4 font-semibold">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Licensing
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

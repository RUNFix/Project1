import React, { useState, FormEvent } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
      <div className="mb-8 text-center px-4">
        <h1 className="text-red-500 font-extrabold text-3xl sm:text-4xl">
          TALLER AUTOMOTRIZ RUNFix 🚘
        </h1>
      </div>
      <div className="w-full max-w-xs sm:max-w-md bg-red-500 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-extrabold text-yellow-50 mb-4">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-blue-600 focus:ring focus:ring-blue-200"
              placeholder="Correo electrónico"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Contraseña"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

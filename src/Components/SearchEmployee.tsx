import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_SEARCH_EMPLOYEE } from 'src/api/api';

const SearchEmployee: React.FC  = () => {
const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);
  useEffect(() => {
    
  }, []);

  const handleSearch = (e) => {
    
    const query = e.target.value;

    setSearchTerm(query);
    console.log(searchTerm);
    console.log(`${API_SEARCH_EMPLOYEE}/${searchTerm}`)
    axios
    .get(`${API_SEARCH_EMPLOYEE}/${searchTerm}`).then((response) => {
        const resultsApi = response.data;
        console.log(resultsApi);
        setResults(resultsApi);
    }
    );
    
  };
 

  return (
   <>
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-500"
      />
      <ul className="mt-2">
        {results.map((employee, index) => (
          <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
            <span className="font-semibold">Nombre:</span> {employee.fullName}  <span className="font-semibold">Cedula:</span> {employee.cc} <span className="font-semibold">Cargo:</span> {employee.position}
          </li>
        ))}
      </ul>
    </div>
   </>
  );
};
export default SearchEmployee;

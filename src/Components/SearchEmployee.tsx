import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_SEARCH_EMPLOYEE } from 'src/api/api';

interface SearchEmployeeProps {
  onEmployeeFilter: (datos: any) => void;
}


const SearchEmployee:  React.FC<SearchEmployeeProps>  = ({onEmployeeFilter}) => {
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
        onEmployeeFilter(resultsApi);
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
      
    </div>
   </>
  );
};
export default SearchEmployee;

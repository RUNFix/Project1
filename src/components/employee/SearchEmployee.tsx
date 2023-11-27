import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from 'src/utils/Auth';
import { debounce } from 'lodash';
import { API_SEARCH_EMPLOYEE } from 'src/api/api';

interface SearchEmployeeProps {
  onEmployeeFilter: (datos: any) => void;
}

const SearchEmployee: React.FC<SearchEmployeeProps> = ({
  onEmployeeFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsCache, setResultsCache] = useState<{ [query: string]: any }>(
    {},
  );

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (resultsCache[query]) {
        onEmployeeFilter(resultsCache[query]);
      } else {
        try {
          // Llamado con axios Instance
          const response = await axiosInstance.get(`${API_SEARCH_EMPLOYEE}/${query}`);
          const resultsApi = response.data;
          setResultsCache((prevCache) => ({
            ...prevCache,
            [query]: resultsApi,
          }));
          onEmployeeFilter(resultsApi);
        } catch (error) {
          console.error('Error fetching the search results', error);
        }
      }
    }, 200),
    [],
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      onEmployeeFilter([]);
    }
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default SearchEmployee;

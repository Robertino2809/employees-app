import { useState } from 'react';
import { employees } from '../assets/employees';

const Employees = () => {
  const [searchText, setSearchText] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' });

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleJobTitleFilterChange = (event) => {
    setJobTitleFilter(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...employees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    const firstNameMatch = item.firstName.toLowerCase().includes(searchText.toLowerCase());
    const lastNameMatch = item.lastName.toLowerCase().includes(searchText.toLowerCase());
    const jobTitleMatch = item.jobTitle.toLowerCase().includes(jobTitleFilter.toLowerCase());
    return (firstNameMatch || lastNameMatch) && jobTitleMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-5 h-full">
      <h1 className="text-2xl font-bold mb-3">Podatci o zaposlenicima</h1>
      <div className="flex gap-5 mb-4">
        <div className="w-full">
          <form>
            <input
              type="text"
              placeholder="Pretraživanje prema imenu ili prezimenu"
              className="w-full h-10 rounded-lg border border-gray-300 p-2"
              value={searchText}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        <div className="w-full">
          <form>
            <input
              type="text"
              placeholder="Filtriranje prema radnom mjestu"
              className="w-full h-10 rounded-lg border border-gray-300 p-2"
              value={jobTitleFilter}
              onChange={handleJobTitleFilterChange}
            />
          </form>
        </div>
      </div>

      <table className="w-full shadow-lg border border-gray-200">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th
              className="w-24 p-3 text-sm font-semibold tracking-wide text-left cursor-pointer"
              onClick={() => requestSort('firstName')}
            >
              Ime {sortConfig.key === 'firstName' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th
              className="w-24 p-3 text-sm font-semibold tracking-wide text-left cursor-pointer"
              onClick={() => requestSort('lastName')}
            >
              Prezime {sortConfig.key === 'lastName' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th
              className="w-24 p-3 text-sm font-semibold tracking-wide text-left cursor-pointer"
              onClick={() => requestSort('dateOfBirth')}
            >
              Datum rođenja {sortConfig.key === 'dateOfBirth' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th
              className="w-24 p-3 text-sm font-semibold tracking-wide text-left cursor-pointer"
              onClick={() => requestSort('jobTitle')}
            >
              Radno mjesto {sortConfig.key === 'jobTitle' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {currentItems.map((employee) => (
            <tr key={employee.id}>
              <td className="whitespace-nowrap p-3 text-sm text-gray-700 border-b-2">{employee.firstName}</td>
              <td className="whitespace-nowrap p-3 text-sm text-gray-700 border-b-2">{employee.lastName}</td>
              <td className="whitespace-nowrap p-3 text-sm text-gray-700 border-b-2">{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
              <td className="whitespace-nowrap p-3 text-sm text-gray-700 border-b-2">{employee.jobTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center mt-5 gap-1'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Employees;

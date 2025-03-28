// import { useState } from "react";

// const SearchFilter = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//     onSearch(e.target.value); // Send search term to parent
//   };

//   return (
//     <div className="mb-4 flex justify-center">
//       <input
//         type="text"
//         className="w-full max-w-md border p-2 rounded"
//         placeholder="Search by name or email..."
//         value={query}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default SearchFilter;

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi"; // Import icons

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative w-full max-w-lg">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-12 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Search users by name or email..."
          value={query}
          onChange={handleChange}
        />
        {query && (
          <FiX
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default SearchFilter;

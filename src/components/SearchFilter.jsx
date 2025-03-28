import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

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
      <div className="relative w-full max-w-3xl">
        <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
        
          type="text"
          className="w-full border border-gray-300 rounded-full py-4 pl-14 pr-14 shadow-md backdrop-blur-lg bg-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          placeholder="Search users by name or email..."
          value={query}
          onChange={handleChange}
        />

        {query && (
          <FiX
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition-all"
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default SearchFilter;

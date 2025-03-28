
const Pagination = ({ page, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center mt-6 space-x-2">
        {/* First Page Button */}
        <button
          className={`px-5 py-3 rounded-lg text-white font-semibold transition-all ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
          }`}
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          ⏮ First
        </button>
  
        {/* Previous Page Button */}
        <button
          className={`px-5 py-3 rounded-lg text-white font-semibold transition-all ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>
  
        {/* Page Number Display */}
        <span className="px-6 py-3 bg-gray-100 rounded-lg text-lg font-bold">{page} / {totalPages}</span>
  
        {/* Next Page Button */}
        <button
          className={`px-5 py-3 rounded-lg text-white font-semibold transition-all ${
            page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
  
        {/* Last Page Button */}
        <button
          className={`px-5 py-3 rounded-lg text-white font-semibold transition-all ${
            page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
          }`}
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          Last ⏭
        </button>
      </div>
    );
  };
  
  export default Pagination;
  
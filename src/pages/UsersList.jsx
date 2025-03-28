// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";

// const UsersList = () => {
//   const [users, setUsers] = useState([]);  // Store users list
//   const [page, setPage] = useState(1);  // Current page number
//   const [totalPages, setTotalPages] = useState(1);  // Total pages
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [error, setError] = useState("");  // Error message

//   const navigate = useNavigate();

//   // Fetch users when page changes
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await api.get(`/users?page=${page}`);
//         setUsers(response.data.data);  // Store users
//         setTotalPages(response.data.total_pages);  // Set total pages
//       } catch (err) {
//         setError("Failed to load users. Please try again.");
//       }

//       setLoading(false);
//     };

//     fetchUsers();
//   }, [page]);

//   // Logout if token is missing
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Users List</h2>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && !error && (
//         <>
//           {/* Users Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {users.map((user) => (
//               <div key={user.id} className="bg-white p-4 rounded-lg shadow-md text-center">
//                 <img src={user.avatar} alt={user.first_name} className="mx-auto rounded-full w-24 h-24 mb-4" />
//                 <h3 className="text-lg font-bold">{user.first_name} {user.last_name}</h3>
//                 <p className="text-gray-600">{user.email}</p>
//               </div>
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center mt-6 space-x-4">
//             <button
//               className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
//               onClick={() => setPage(page - 1)}
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <span className="text-lg font-semibold">{page} / {totalPages}</span>
//             <button
//               className={`px-4 py-2 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
//               onClick={() => setPage(page + 1)}
//               disabled={page === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UsersList;



// second
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";
// import UserCard from "../components/UserCard";
// import Pagination from "../components/Pagination";

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await api.get(`/users?page=${page}`);
//         setUsers(response.data.data);
//         setTotalPages(response.data.total_pages);
//       } catch (err) {
//         setError("Failed to load users. Please try again.");
//       }

//       setLoading(false);
//     };

//     fetchUsers();
//   }, [page]);

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/users/${id}`);
//       setUsers(users.filter(user => user.id !== id));
//     } catch (err) {
//       alert("Failed to delete user.");
//     }
//   };

//   const handleUpdate = (updatedUser) => {
//     setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Users List</h2>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {users.map((user) => (
//           <UserCard key={user.id} user={user} onDelete={handleDelete} onUpdate={handleUpdate} />
//         ))}
//       </div>

//       <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
//     </div>
//   );
// };

// export default UsersList;



// third
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";
// import UserEdit from "../components/UserEdit.jsx"  // Import the new component

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editingUser, setEditingUser] = useState(null);  // Track the user being edited

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await api.get(`/users?page=${page}`);
//         setUsers(response.data.data);
//         setTotalPages(response.data.total_pages);
//       } catch (err) {
//         setError("Failed to load users. Please try again.");
//       }
//       setLoading(false);
//     };

//     fetchUsers();
//   }, [page]);

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Handle user update
//   const handleUpdateUser = (updatedUser) => {
//     setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
//     setEditingUser(null);  // Close the edit modal
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Users List</h2>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && !error && (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {users.map((user) => (
//               <div key={user.id} className="bg-white p-4 rounded-lg shadow-md text-center">
//                 <img src={user.avatar} alt={user.first_name} className="mx-auto rounded-full w-24 h-24 mb-4" />
//                 <h3 className="text-lg font-bold">{user.first_name} {user.last_name}</h3>
//                 <p className="text-gray-600">{user.email}</p>

//                 {/* Edit & Delete Buttons */}
//                 <button onClick={() => setEditingUser(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center mt-6 space-x-4">
//             <button
//               className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
//               onClick={() => setPage(page - 1)}
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <span className="text-lg font-semibold">{page} / {totalPages}</span>
//             <button
//               className={`px-4 py-2 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
//               onClick={() => setPage(page + 1)}
//               disabled={page === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}

//       {/* Render Edit Modal */}
//       {editingUser && (
//         <UserEdit user={editingUser} onUpdate={handleUpdateUser} onCancel={() => setEditingUser(null)} />
//       )}
//     </div>
//   );
// };

// export default UsersList;


// fourth
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";
// import UserCard from "../components/UserCard";
// import Pagination from "../components/Pagination";
// import SearchFilter from "../components/SearchFilter"; // Import the new component

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]); // New state for filtered users
//   const [searchQuery, setSearchQuery] = useState(""); // New search state
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   useEffect(() => {
//         if (!localStorage.getItem("token")) {
//           navigate("/login");
//         }
//       }, [navigate]);
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await api.get(`/users?page=${page}`);
//         setUsers(response.data.data);
//         setTotalPages(response.data.total_pages);
//       } catch (err) {
//         setError("Failed to load users. Please try again.");
//       }

//       setLoading(false);
//     };

//     fetchUsers();
//   }, [page]);

//   useEffect(() => {
//     // Filter users based on search input
//     const filtered = users.filter(
//       (user) =>
//         user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [searchQuery, users]); // Re-run filtering when search query or users change

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/users/${id}`);
//       setUsers(users.filter((user) => user.id !== id));
//     } catch (err) {
//       alert("Failed to delete user.");
//     }
//   };

//   const handleUpdate = (updatedUser) => {
//     setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Users List</h2>

//       <SearchFilter onSearch={handleSearch} /> {/* Add search component */}

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user) => (
//             <UserCard key={user.id} user={user} onDelete={handleDelete} onUpdate={handleUpdate} />
//           ))
//         ) : (
//           <p className="text-center col-span-3 text-gray-500">No users found.</p>
//         )}
//       </div>

//       <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
//     </div>
//   );
// };

// export default UsersList;



// six
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      }
      setLoading(false);
    };
    fetchUsers();
  }, [page]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-900 border-b-2 pb-4">Users List</h2>

      <div className="flex justify-center mt-6">
        <SearchFilter onSearch={handleSearch} />
      </div>

      {loading && <p className="text-center text-lg text-gray-700">Loading...</p>}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">No users found.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default UsersList;


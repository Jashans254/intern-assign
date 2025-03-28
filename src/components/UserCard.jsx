// import { useState } from "react";
// import EditUserModal from "./EditUserModal";

// const UserCard = ({ user, onDelete, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md text-center">
//       <img src={user.avatar} alt={user.first_name} className="mx-auto rounded-full w-24 h-24 mb-4" />
//       <h3 className="text-lg font-bold">{user.first_name} {user.last_name}</h3>
//       <p className="text-gray-600">{user.email}</p>

//       {/* Action Buttons */}
//       <div className="mt-4 space-x-2">
//         <button
//           className="px-3 py-1 bg-blue-500 text-white rounded"
//           onClick={() => setIsEditing(true)}
//         >
//           Edit
//         </button>
//         <button
//           className="px-3 py-1 bg-red-500 text-white rounded"
//           onClick={() => onDelete(user.id)}
//         >
//           Delete
//         </button>
//       </div>

//       {/* Edit Modal */}
//       {isEditing && (
//         <EditUserModal
//           user={user}
//           onClose={() => setIsEditing(false)}
//           onUpdate={onUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default UserCard;
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons

const UserCard = ({ user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all">
      {/* User Avatar */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img 
          src={user.avatar} 
          alt={user.first_name} 
          className="rounded-full w-full h-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* User Details */}
      <h3 className="text-xl font-semibold text-gray-900">{user.first_name} {user.last_name}</h3>
      <p className="text-sm text-gray-600 mt-1">{user.email}</p>

      {/* Action Buttons */}
      <div className="mt-5 flex justify-center space-x-4">
        <button
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          onClick={() => setIsEditing(true)}
        >
          <FiEdit className="mr-2" /> Edit
        </button>
        <button
          className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all"
          onClick={() => onDelete(user.id)}
        >
          <FiTrash2 className="mr-2" /> Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditUserModal
          user={user}
          onClose={() => setIsEditing(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default UserCard;

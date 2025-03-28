import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const UserCard = ({ user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-300 text-center hover:shadow-xl transition-all duration-300">
      {/* User Avatar */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="rounded-full w-full h-full object-cover border-4 border-gray-300 shadow-sm transition-all hover:scale-105"
        />
      </div>

      {/* User Details */}
      <h3 className="text-2xl font-semibold text-gray-900">{user.first_name} {user.last_name}</h3>
      <p className="text-sm text-gray-600 mt-1">{user.email}</p>

      {/* Action Buttons */}
      <div className="mt-5 flex justify-center space-x-4">
        <button
          className="flex items-center px-5 py-3 text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300"
          onClick={() => setIsEditing(true)}
        >
          <FiEdit className="mr-2 text-lg" /> Edit
        </button>
        <button
          className="flex items-center px-5 py-3 text-white bg-red-600 rounded-xl shadow-md hover:bg-red-700 transition-all duration-300"
          onClick={() => onDelete(user.id)}
        >
          <FiTrash2 className="mr-2 text-lg" /> Delete
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

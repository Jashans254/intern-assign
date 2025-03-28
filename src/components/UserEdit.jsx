import { useState } from "react";
import { api } from "../services/api";

const UserEdit = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error messages
    setLoading(true);

    // Trimmed Data
    const trimmedData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar.trim(),
    };

    // Debugging: Check Form Values Before Validation
    console.log("Trimmed Data:", trimmedData);

    // Validate Empty Fields
    if (!trimmedData.first_name || !trimmedData.last_name || !trimmedData.email) {
        setError("All fields must be filled out.");
        setLoading(false);
        return; // Stop further execution
    }

    // Validate Email Format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
        setError("Invalid email format.");
        setLoading(false);
        return; // Stop further execution
    }

    try {
        const response = await api.put(`/users/${user.id}`, trimmedData);
        onUpdate(response.data);
    } catch (err) {
        setError("Failed to update user.");
        setLoading(false);
        return; // Ensure the function stops here
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        { <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="First Name"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Email"
          />
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Avatar URL"
          />

          <div className="flex justify-end mt-4">
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;

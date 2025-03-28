import { useState, useEffect } from "react";
import { api } from "../services/api";

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user.first_name.trim(),
    lastName: user.last_name.trim(),
    email: user.email.trim(),
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", api: "" });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value.trim() }));

    if (field !== "email" && value.trim().length === 0) {
      setErrors((prev) => ({ ...prev, [field]: "This field cannot be empty." }));
    } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors((prev) => ({ ...prev, api: "" }));

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setErrors((prev) => ({ ...prev, api: "All fields are required." }));
      setLoading(false);
      return;
    }

    try {
      const response = await api.put(`/users/${user.id}`, formData);
      onUpdate(response.data);
      onClose();
    } catch (err) {
      setErrors((prev) => ({ ...prev, api: "Failed to update user. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Edit User</h2>

        {errors.api && <p className="text-red-600 mb-2 text-center">{errors.api}</p>}

        <input
          type="text"
          className={`w-full border p-3 rounded mt-2 focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="First Name"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

        <input
          type="text"
          className={`w-full border p-3 mt-2 rounded focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Last Name"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

        <input
          type="email"
          className={`w-full border p-3 mt-2 rounded focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-white transition-all ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            onClick={handleUpdate}
            disabled={loading || Object.values(errors).some((err) => err)}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
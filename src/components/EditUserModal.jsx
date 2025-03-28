// import { useState } from "react";
// import { api } from "../services/api";

// const EditUserModal = ({ user, onClose, onUpdate }) => {
//   const [firstName, setFirstName] = useState(user.first_name.trim());
//   const [lastName, setLastName] = useState(user.last_name.trim());
//   const [email, setEmail] = useState(user.email.trim());
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [nameError, setNameError] = useState("");

//   // Real-time validation for names
//   const handleNameChange = (setter, value) => {
//     setter(value);
//     if (!value.trim()) {
//       setNameError("First and Last name cannot be empty.");
//     } else {
//       setNameError("");
//     }
//   };

//   // Real-time email validation
//   const handleEmailChange = (value) => {
//     setEmail(value);
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
//       setEmailError("Invalid email format.");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setError(""); 
//     setLoading(true);

//     // Trimmed Data
//     const trimmedData = {
//       first_name: firstName.trim(),
//       last_name: lastName.trim(),
//       email: email.trim(),
//     };

//     // Validation Checks
//     if (!trimmedData.first_name || !trimmedData.last_name) {
//       setError("First name and last name are required.");
//       setLoading(false);
//       return;
//     }

//     if (!trimmedData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
//       setError("Invalid email format.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await api.put(`/users/${user.id}`, trimmedData);
//       onUpdate(response.data);
//       onClose();
//     } catch (err) {
//       setError("Failed to update user. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//       <div className="bg-white p-6 rounded shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Edit User</h2>

//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <input
//           type="text"
//           className="w-full border p-2 mb-1"
//           value={firstName}
//           onChange={(e) => handleNameChange(setFirstName, e.target.value)}
//           placeholder="First Name"
//         />
//         {nameError && <p className="text-red-500 text-sm mb-2">{nameError}</p>}

//         <input
//           type="text"
//           className="w-full border p-2 mb-1"
//           value={lastName}
//           onChange={(e) => handleNameChange(setLastName, e.target.value)}
//           placeholder="Last Name"
//         />

//         <input
//           type="email"
//           className="w-full border p-2 mb-1"
//           value={email}
//           onChange={(e) => handleEmailChange(e.target.value)}
//           placeholder="Email"
//         />
//         {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}

//         <div className="flex justify-end space-x-2">
//           <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>Cancel</button>
//           <button 
//             className={`px-4 py-2 ${loading ? "bg-gray-400" : "bg-green-500"} text-white rounded`} 
//             onClick={handleUpdate} 
//             disabled={loading || nameError || emailError}
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;
import { useState , useEffect} from "react";
import { api } from "../services/api";

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user.first_name.trim(),
    lastName: user.last_name.trim(),
    email: user.email.trim(),
  });
  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", api: "" });

  // Generic Input Handler (Trim on Input)
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value.trim() }));

    // Validation
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

    // Validation Check
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
    // <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">

      <div className="bg-gray-100 p-8 rounded-lg shadow-xl w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Edit User</h2>

        {/* API Error */}
        {errors.api && <p className="text-red-600 mb-2 text-center">{errors.api}</p>}

        {/* First Name Input */}
        <input
          type="text"
          className={`w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="First Name"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

        {/* Last Name Input */}
        <input
          type="text"
          className={`w-full border p-3 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Last Name"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

        {/* Email Input */}
        <input
          type="email"
          className={`w-full border p-3 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-white transition-all ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
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


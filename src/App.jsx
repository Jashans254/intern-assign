import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


// import { api } from "./services/api";
// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     api.get("/users?page=1")
//       .then((res) => console.log("API Response:", res.data))
//       .catch((err) => console.error("API Error:", err));
//   }, []);

//   return <h1>Test API Connection</h1>;
// }

// export default App;

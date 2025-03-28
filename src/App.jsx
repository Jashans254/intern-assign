import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";


function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        {/* <Route path="/users/edit/:id" element={<EditUser />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/DashBoard";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

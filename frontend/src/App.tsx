import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shell from "./pages/Shell";
import LoginShell from "./pages/Shell/login";
import Courses from "./pages/Courses";
import Grades from "./pages/Grades";
import Profile from "./pages/Profile";

import "./App.css";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginShell />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<LoginShell />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="/" element={<Shell />}>
            <Route index element={<Home />} />
            <Route
              path="profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route
              path="courses"
              element={<ProtectedRoute component={Courses} />}
            />
            <Route
              path="grades"
              element={<ProtectedRoute component={Grades} />}
            />
            <Route path="*" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

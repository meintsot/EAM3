import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shell from "./pages/Shell";
import LoginShell from "./pages/Shell/login";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Grades from "./pages/Grades";
import Profile from "./pages/Profile";
import Declarations from "./pages/Declarations";
import Declaration from "./pages/Declaration";
import GradeBooks from "./pages/GradeBooks";
import GradeBook from "./pages/GradeBook";
import Certificates from "./pages/Certificates";
import CertificateRequest from "./pages/CerificateRequest";
import EditProfile from "./pages/EditProfile";

import "./App.css";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateGradeBook from "./pages/CreateGradeBook";

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
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<Course />} />
            <Route
              path="courses/declaration/:declarationId"
              element={<Declaration />}
            />
            <Route
              path="declarations/:declarationId"
              element={<Declaration />}
            />
            <Route path="declarations" element={<Declarations />} />
            <Route path="gradebooks" element={<GradeBooks />} />
            <Route path="gradebooks/:gradebookId" element={<GradeBook />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="create-gradebook" element={<CreateGradeBook />} />
            <Route
              path="certificate-request"
              element={<CertificateRequest />}
            />
            <Route path="grades" element={<Grades />} />
            <Route path="*" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

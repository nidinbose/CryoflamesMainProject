import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* Pages & Components */
import Homescreen from "./Components/Pages/Homescreen/Homescreen";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components/PageComponents/HomescreenComponents/Navbar";
import Footer from "./Components/PageComponents/HomescreenComponents/Footer";

import Admin from "./Components/Dashboards/Admin";
import User from "./Components/Dashboards/User";

import CourseApplying from "./Components/PageComponents/HomescreenComponents/CourseApplying";
import ViewCourses from "./Components/PageComponents/HomescreenComponents/ViewCourses";
import CoursesAdmin from "./Components/AdminComponents/CoursesAdmin";
import StudentsAdmin from "./Components/AdminComponents/StudentsAdmin";
import ViewStudent from "./Components/AdminComponents/ViewStudent";
import AddAdmin from "./Components/AdminComponents/AddAdmin";

import Enroll from "./Components/Payments/Enroll";
import CoursePage from "./Components/Pages/CoursesPage/CoursePage";
import Achivement from "./Components/Pages/AchivementPage/Achivement";
import Blog from "./Components/Pages/BlogPage/Blog";
import Certification from "./Components/Pages/CertificationPage/Certification";
import Contact from "./Components/Pages/ContactPage/Contact";

import { getProfile } from "./Features/authSlice";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, authLoading } = useSelector(
    (state) => state.auth
  );

  if (authLoading) return null; 

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Layout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/achivements" element={<Achivement />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/certifications" element={<Certification />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/applycourse" element={<CourseApplying />} />
        <Route path="/ViewCourses/:id" element={<ViewCourses />} />
        <Route path="/enroll/:courseId" element={<Enroll />} />

        <Route path="/user" element={<User />} />

        <Route
          path="/admin/AdminDashboard"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/AddAdmin"
          element={
            <AdminRoute>
              <AddAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/CoursesAdmin"
          element={
            <AdminRoute>
              <CoursesAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/StudentsAdmin"
          element={
            <AdminRoute>
              <StudentsAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/ViewStudent/:userId"
          element={
            <AdminRoute>
              <ViewStudent />
            </AdminRoute>
          }
        />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;

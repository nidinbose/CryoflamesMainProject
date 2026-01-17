import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Homescreen from './Components/Pages/Homescreen/Homescreen'
import Login from './Components/Auth/Login'
import Navbar from './Components/PageComponents/HomescreenComponents/Navbar'
import Register from './Components/Auth/Register'
import Admin from './Components/Dashboards/Admin'
import CourseApplying from './Components/PageComponents/HomescreenComponents/CourseApplying'
import User from './Components/Dashboards/User'
import AddAdmin from './Components/AdminComponents/AddAdmin'
import ViewCourses from './Components/PageComponents/HomescreenComponents/ViewCourses'
import CoursesAdmin from './Components/AdminComponents/CoursesAdmin'
import StudentsAdmin from './Components/AdminComponents/StudentsAdmin'
import ViewStudent from './Components/AdminComponents/ViewStudent'
import Enroll from './Components/Payments/Enroll'
import CoursePage from './Components/Pages/CoursesPage/CoursePage'
import Footer from './Components/PageComponents/HomescreenComponents/Footer'
import Achivement from './Components/Pages/AchivementPage/Achivement'
import Blog from './Components/Pages/BlogPage/Blog'
import Certification from './Components/Pages/CertificationPage/Certification'
import Contact from './Components/Pages/ContactPage/Contact'

const Layout = () => {
  const location = useLocation()

  const hideNavbar = location.pathname.startsWith('/admin')

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/login" element={<Login />} />
         <Route path="/courses" element={<CoursePage/>} />
         <Route path="/achivements" element={<Achivement/>} />
            <Route path="/blog" element={<Blog/>} />
               <Route path="/certifications" element={<Certification/>} />
                 <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/applycourse" element={<CourseApplying />} />
         <Route path="/user" element={<User/>} />
            <Route path="/ViewCourses/:id" element={<ViewCourses/>} />
               <Route path="/enroll/:courseId" element={<Enroll/>} />

        <Route path="/admin/AdminDashboard" element={<Admin />} />
         <Route path="/admin/AddAdmin" element={<AddAdmin/>} />
           <Route path="/admin/CoursesAdmin" element={<CoursesAdmin/>} />
              <Route path="/admin/StudentsAdmin" element={<StudentsAdmin/>} />
              <Route path="/admin/ViewStudent/:id" element={<ViewStudent/>} />
          
      </Routes>
      <Footer/>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App

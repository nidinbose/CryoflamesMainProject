import { Router } from "express";
import * as users from '../Countrollers/authCountrollers.js'
import *as course from '../Countrollers/courseCountrollers.js'
import * as payment from '../Countrollers/paymentCountroller.js'
import * as student from '../Countrollers/studentCountroller.js'
import Auth from '../Middleware/authMiddleware.js'
const authrouter=Router()

authrouter.route('/userRegister').post(users.userRegister)
authrouter.route('/userLogin').post(users.userLogin)
authrouter.route('/getProfile').get(Auth,users.getProfile)
authrouter.route('/updateUser/:id').put(users.updateUser)
authrouter.route('/getUsers').get(users.getAllUsers)
authrouter.route('/logout').post(Auth,users.userLogout)
authrouter.route('/getUsersId/:id').get(users.getUserById)

authrouter.route('/updateUserAdditional/:id').put(users.updateAdditionalInfo)


authrouter.route('/getStudent/:userId').get(student.getByStudentId)
authrouter.route('/getStudents').get(student.getAllStudents)
authrouter.route('/updateStudent/:userId').put(student.updateStudentByUserId)
authrouter.route('/getPayments').get(student.getAllPayments)




// payment


authrouter.route('/create-order').post(payment.createOrder)
authrouter.route('/verify-payment').post(payment.verifyPayment)



authrouter.route('/addCourse').post(course.createCourse)
authrouter.route('/getCourse').get(course.getAllCourses)
authrouter.route('/getCourseId/:id').get(course.getCourseById)
authrouter.route('/updateCourse/:id').put(course.updateCourse)
authrouter.route('/deleteCourse/:id').delete(course.deleteCourse)





export default authrouter
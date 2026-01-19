import { Router } from "express";
import * as student from '../Countrollers/studentCountroller.js'
const studentRoute=Router()


studentRoute.route('/getStudent/:userId').get(student.getByStudentId)
studentRoute.route('/getStudents').get(student.getAllStudents)
studentRoute.route('/updateStudent/:userId').put(student.updateStudentByUserId)
studentRoute.route('/getPayments').get(student.getAllPayments)




export default studentRoute
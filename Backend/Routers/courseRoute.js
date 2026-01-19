import { Router } from "express";
import *as course from '../Countrollers/courseCountrollers.js'

const courseRoute=Router()

courseRoute.route('/addCourse').post(course.createCourse)
courseRoute.route('/getCourse').get(course.getAllCourses)
courseRoute.route('/getCourseId/:id').get(course.getCourseById)
courseRoute.route('/updateCourse/:id').put(course.updateCourse)
courseRoute.route('/deleteCourse/:id').delete(course.deleteCourse)


export default courseRoute
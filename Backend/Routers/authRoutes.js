import { Router } from "express";
import * as users from '../Countrollers/authCountrollers.js'

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








export default authrouter
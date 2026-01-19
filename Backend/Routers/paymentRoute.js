import { Router } from "express";
import * as payment from '../Countrollers/paymentCountroller.js'

const paymentRoute=Router()


paymentRoute.route('/create-order').post(payment.createOrder)
paymentRoute.route('/verify-payment').post(payment.verifyPayment)




export default paymentRoute
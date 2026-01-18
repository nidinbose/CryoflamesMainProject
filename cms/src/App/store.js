import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Features/authSlice'
import adminReducer from '../Features/adminSlice'
import courseReducer from '../Features/courseSlice'
import paymentReducer from '../Features/paymentSlice'
import studentReducer from '../Features/studentSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        course:courseReducer,
        payment:paymentReducer,
        student:studentReducer
    }
})

export default store
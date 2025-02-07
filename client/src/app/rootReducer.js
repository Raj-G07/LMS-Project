import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slice/authSlice"
import { authApi } from "@/slice/api/authApi"
import { courseApi } from "@/slice/api/courseApi";
import { purchaseApi } from "@/slice/api/purchaseApi";
import { courseProgressApi } from "@/slice/api/courseProgressApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer

});

export default rootReducer;
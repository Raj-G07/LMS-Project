import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { authApi } from "@/slice/api/authApi"
import { courseApi } from "@/slice/api/courseApi"
import { purchaseApi } from "@/slice/api/purchaseApi"
import { courseProgressApi } from "@/slice/api/courseProgressApi"
export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware)
})

const intializeApp = async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefatch:true}))
}
intializeApp();
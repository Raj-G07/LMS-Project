import express from 'express'
import { createCheckoutSession, getAllPurchaseCourse, getCourseDetailPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js"
const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSession)
router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook)
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailPurchaseStatus)

router.route("/").get(isAuthenticated,getAllPurchaseCourse);

export default router;
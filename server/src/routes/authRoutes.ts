import express from 'express' 
import multer from 'multer';
import { protect } from '../middleware/userMiddleware';
import {  login, registerCompany, registerUser, resendOtp, verifyCompanyOtp, verifyOtp, verifyUserOtp, } from '../controller/authController';


const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage, limits:{
    fileSize: 1024 * 1024 * 5,
    
} });

router.post("/register-company", registerCompany);
router.post("/register-user", registerUser);
router.post("/verify-company-otp",verifyCompanyOtp)
router.post("/verify-user-otp",verifyUserOtp);
router.post("/send-user-reset-otp", resendOtp);
router.post("/verify-reset-otp", verifyOtp);
router.post("/login", login)
export default router;
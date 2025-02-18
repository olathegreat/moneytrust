import express from 'express' 
import multer from 'multer';
import { protect } from '../middleware/userMiddleware';
import {  registerCompany, verifyOtp } from '../controller/authController';


const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage, limits:{
    fileSize: 1024 * 1024 * 5,
    
} });

router.post("/register-company", registerCompany);
router.post("/verify-company-otp",verifyOtp)
export default router;
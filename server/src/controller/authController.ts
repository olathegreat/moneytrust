import { Request, Response } from 'express';
import Company from '../model/companyModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { ObjectId } from 'mongoose';
import { Resend } from 'resend';
dotenv.config();


const resend = new Resend(process.env.RESEND_API_KEY);


const signToken = (id: ObjectId) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
        expiresIn: Number(process.env.JWT_EXPIRES) || 86400
    })
}

export const registerCompany = async (req: Request, res: Response): Promise<void> => {
    const { companyName, typeOfBusiness, dateOfIncorporation, companyEmail, password } = req.body;

    try {
        const existingCompany = await Company.findOne({ companyEmail });
        if (existingCompany) {
            res.status(400).json({ message: 'Company already registered with this email' });
            return;
        }

        // Generate OTP and expiry time
        const otp = crypto.randomInt(1000, 9999).toString();
        const otpExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes expiry

        const newCompany = await Company.create({
            companyName,
            typeOfBusiness,
            dateOfIncorporation,
            companyEmail,
            password,
            otp,
            otpExpires,
            isVerified: false
        });

       

        const token = signToken(newCompany._id);

        res.status(201).json({
            status: 'success',
            token,
            message: 'Company registered successfully. Verify your email with the OTP sent.',
            data: {
                company: {
                    _id: newCompany._id,
                    companyName: newCompany.companyName,
                    companyEmail: newCompany.companyEmail,
                    isVerified: newCompany.isVerified,
                    otp
                }
            }
        });
         // Send OTP email via Resend
         await resend.emails.send({
            from: `Your Company <${process.env.FROM_EMAIL}>`,
            to: companyEmail,
            subject: 'Verify Your Email - OTP Code',
            html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This code expires in 30 minutes.</p>`,
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during company registration' });
    }
};




export const verifyOtp = async (req: Request, res: Response):Promise<void> => {
  const { companyEmail, otp } = req.body;

  try {
    const company = await Company.findOne({ companyEmail });

    if (!company) {
       res.status(404).json({ message: 'Company not found' });
       return
    }

    if (company.isVerified) {
      res.status(400).json({ message: 'Email is already verified' });
      return
    }

    if (company.otp !== otp) {
       res.status(400).json({ message: 'Invalid OTP' });
       return
    }

    if (company.otpExpires && new Date(company.otpExpires) < new Date()) {
    res.status(400).json({ message: 'OTP has expired. Request a new one.' });
    return
    }

    // Mark company as verified
    company.isVerified = true;
    company.otp = undefined;
    company.otpExpires = undefined;
    await company.save();

    res.status(200).json({ status: 'success', message: 'Email verified successfully' });
    return

  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};


import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import SuccessImage from "../assets/success.png";
import { apiClient } from "../lib/apiClient";
import { toast } from "sonner";
import Confetti from "react-confetti";


const RegisterCorporate = () => {
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [dateOfIncorporation, setDateOfIncorporation] = useState<
    Date | undefined
  >(undefined);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [companyNameError, setCompanyNameError] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [typeOfBusinessError, setTypeOfBusinessError] = useState("");
  
  const [dateOfIncorporationError, setDateOfIncorporationError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");


  useEffect(() => {
    if (formStep === 4) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [formStep]);

  const nextFunction = () => {
    if (
      formStep === 1 &&
      companyName &&
      typeOfBusiness &&
      dateOfIncorporation
    ) {
      setFormStep(2);
    } else if (formStep === 2 && companyName &&
      typeOfBusiness &&
      dateOfIncorporation &&
      password &&
      companyEmail &&
      confirmPassword) {
       
         signUpCompany();
          
    } else if (formStep === 3 &&  companyName &&
      typeOfBusiness &&
      dateOfIncorporation &&
      password &&
      companyEmail &&
      confirmPassword &&
      otp) {
      verifyOtp()
        
    }

    if(formStep ===1 && !companyName){
      setCompanyNameError("Company name is required");
    }
  if(formStep ===1 && !typeOfBusiness){
      setTypeOfBusinessError("Type of business is required");
    }
    if(formStep ===1 && !dateOfIncorporation){
      setDateOfIncorporationError("Date of incorporation is required");
    }
    if(formStep ===2 && !password){
      setPasswordError("Password is required");
    }
    if(formStep ===2 && !confirmPassword){
      setConfirmPasswordError("Confirm password is required");
    }
    if(formStep ===2 && !companyEmail){
      setCompanyEmailError("Company email is required");
    }
  };

  // errors
 


  const signUpCompany = async () =>{
    if(confirmPassword !== password){
      setPasswordError("Password must be same")
      setConfirmPasswordError("Password must be the same");
      return;
    }

    if(password.length < 6){
      setPasswordError("Password must be more than 6 characters");
      return;
    }
    if(!companyEmail.includes("@")){
      setCompanyEmailError("Email must contain @");
      return;
    }




      try{
        const response = await apiClient.post("/api/v1/auth/register-company", {
          companyName,
          typeOfBusiness,
          dateOfIncorporation,
          companyEmail,
          password
        })
        console.log(response);
        toast("otp sent to your mail, but for the purpose of testing, otp is" + response.data.data.company.otp)
        setFormStep(3);

      }catch(err){
           console.log(err)
      }
    
  }

  const verifyOtp = async () =>{
    try{
      const response = await apiClient.post("/api/v1/auth/verify-company-otp", {
        otp,
        companyEmail
      })
      console.log(response);
      setFormStep(4);
      toast("company registered successfully");
    }catch(err){
      console.log(err);
      setOtpError("Invalid or expired otp");
    }
  }


  return (
    <div className="flex w-full items-center flex-col gap-10">
      <div className="w-full sm:w-[555px] flex flex-col items-start py-12 px-6 sm:p-12 bg-white">
        {formStep === 1 && (
          <>

            <div className="text-2xl w-full sm:text-3xl text-center">
              Register new account
            </div>
            <div className="mt-2 mb-8 text-[13px] sm:text-[16px] w-full text-center">
              Sign up for an account and start trading today
            </div>

            <div className="mb-2 text-start text-[13px] sm:text-[16px]">
              Sign up for an account and start trading today
            </div>

            <div className="flex justify-start items-start gap-4">
              <Button className="bg-white border-gray-300 border-[2px] rounded-none transition-all duration-300 hover:text-white/60 text-black/80 sm:w-[146px] h-[48px]">
                Individual
              </Button>
              <Button className="bg-black rounded-none transition-all duration-300 hover:text-white/70 text-white sm:w-[146px] h-[48px]">
                Corporate
              </Button>
            </div>
          </>
        )}

        {
          formStep === 3 && (
            <>

            <div className="text-2xl w-full sm:text-3xl text-center">
              Account details
            </div>
            <div className="mt-2 mb-8 text-[13px] sm:text-[16px] w-full text-center">
              Sign up for an account and start trading today
            </div>
            </>
          )
        }

        <div className="flex flex-col w-full gap-4 mt-8">
          {/* stage 1 form */}

          {formStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex w-full flex-col">
                <label className="mb-2">Company Name</label>
                <Input
                  type="text"
                  value={companyName}
                  className={`w-full rounded-none ${companyNameError && "border-red-500"}`}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                />
                <p className="text-[12px] text-red-600">{
                  companyNameError
                  }</p>

              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                {/* Type of Business */}
                <div className="flex flex-col flex-1 gap-2">
                  <label>Type of Business</label>
                  <Select
                  
                   onValueChange={setTypeOfBusiness}>
                    <SelectTrigger className={`w-full rounded-none ${typeOfBusinessError && "border-red-500"}`}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="Corporation">Corporation</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[12px] text-red-600">{
                  typeOfBusinessError
                  }</p>
                </div>

                {/* Date of Incorporation */}
                <div className="flex flex-col flex-1 gap-2">
                  <label>Date of Incorporation</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={`w-full rounded-none justify-start text-left font-normal ${typeOfBusinessError && "border-red-500"}`}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {dateOfIncorporation
                          ? format(dateOfIncorporation, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateOfIncorporation}
                        onSelect={setDateOfIncorporation}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-[12px] text-red-600">{
                  dateOfIncorporationError
                  }</p>
                </div>
              </div>
            </div>
          )}

          {/* stage 2 form */}
          {formStep === 2 && (
            <div className="flex flex-col gap-6">
              <div className="flex w-full flex-col ">
                <label className="mb-2">Company Email</label>
                <Input
                  type="email"
                  value={companyEmail}
                  className={`w-full rounded-none ${companyEmailError && "border-red-600" }`}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="Enter your company email"
                />
                <p className="text-[12px] text-red-600">{
                  companyEmailError
                  }</p>
              </div>

              <div className="flex w-full flex-col ">
                <label className="mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  className={`w-full rounded-none ${passwordError && "border-red-600" }`}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <p className="text-[12px] text-red-600">{
                  passwordError
                  }</p>
              </div>

              <div className="flex w-full flex-col ">
                <label className="mb-2">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  className={`w-full rounded-none ${confirmPasswordError && "border-red-600" }`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your company email"
                />
                <p className="text-[12px] text-red-600">{
                  confirmPasswordError
                  }</p>
              </div>
            </div>
          )}

          {/* stage 3 form */}
          {formStep === 3 && (
            <div className="flex flex-col gap-6">
              <div className="flex w-full flex-col ">
                <label className="text-[14px] mb-2 sm:text-[16px]">
                  Enter the 4 digit code that was sent to {companyEmail}
                </label>
                <Input
                  type="text"
                  maxLength={4}
                  value={otp}
                  className={`w-full rounded-none ${otpError && "border-red-600" }`}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your code"
                />
                <p className="text-[12px] text-red-600">{
                  otpError
                  }</p>

                <div className="cursor-pointer mt-6 mb-2 text-[14px] text-black/60">Resend code</div>
                <div className="cursor-pointer text-[14px] text-black/60">Verify via phone call</div>
              </div>
            </div>
          )}

          {/* stage 4 form */}
          {formStep === 4 && (
            <div className="flex flex-col gap-6">
              {showConfetti && <Confetti width={1000} height={1000} />}
              <div className="flex w-full flex-col gap-2">
                <img src={SuccessImage} alt="success" className="w-full" />
                <label className="text-3xl text-center mt-10">
                  Registration Complete
                </label>
                <p className="text-center text-[12px]">
                  Dear {companyName}. Your registration is now complete. You may
                  proceed to your dashboard and start trading commodities.
                </p>

                <div className="text-[#D71E0E] text-center uppercase mt-10 cursor-pointer">
                  Go to dashboard
                </div>
              </div>
            </div>
          )}

          {formStep !== 4 && (
            <div
              onClick={nextFunction}
              className="text-center text-xl uppercase cursor-pointer mt-10 text-[#D71E0E]"
            >
              Next Step
            </div>
          )}
        </div>
      </div>

      <div className="flex text-gray-700 justify-center">{formStep}/4</div>

      <div className="w-full flex justify-center">
        <div
          className="flex items-center"
          onClick={() => {
            setFormStep(1);
          }}
        >
          <div className="w-3 h-3 bg-[#D71E0E] rounded-full"></div>
          <div className="h-1 w-20   bg-[#D71E0E]"></div>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            companyName &&
              typeOfBusiness &&
              dateOfIncorporation &&
              setFormStep(2);
          }}
        >
          <div
            className={`w-3 h-3 ${
              formStep > 1 ? "bg-[#D71E0E]" : "bg-gray-400/50"
            } rounded-full`}
          ></div>
          <div
            className={`h-1 w-20   ${
              formStep > 1 ? "bg-[#D71E0E]" : "bg-gray-400/50"
            }`}
          ></div>
        </div>
        <div
          className="flex items-center"
          onClick={() => {
            companyName &&
              typeOfBusiness &&
              dateOfIncorporation &&
              password &&
              confirmPassword &&
              companyEmail &&
              setFormStep(3);
          }}
        >
          <div
            className={`w-3 h-3 ${
              formStep > 2 ? "bg-[#D71E0E]" : "bg-gray-400/50"
            } rounded-full`}
          ></div>
          <div
            className={`h-1 w-20   ${
              formStep > 2 ? "bg-[#D71E0E]" : "bg-gray-400/50"
            }`}
          ></div>
        </div>
        {/* <div className="flex items-center">
          <div
            className={`w-4 h-4 ${
              formStep > 3 ? "bg-[#D71E0E]" : "bg-gray-400/50"
            } rounded-full`}
          ></div>
          <div
            className={`h-1 w-20   ${
              formStep > 3 ? "bg-[#D71E0E]" : "bg-gray-400/50"
            }`}
          ></div>
        </div> */}
      </div>
    </div>
  );
};

export default RegisterCorporate;

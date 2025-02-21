import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import SuccessImage from "../assets/success.png";
import { apiClient } from "../lib/apiClient";
import { toast } from "sonner";
import Confetti from "react-confetti";
import CustomLoaderCircle from "./LoaderCircle";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const countryCodes = [
  { code: "+234", label: "🇳🇬 Nigeria" },
  { code: "+1", label: "🇺🇸 USA" },
  { code: "+44", label: "🇬🇧 UK" },
  { code: "+91", label: "🇮🇳 India" },
];

const RegisterUser = ({
  setDisplay,
}: {
  setDisplay: (value: string) => void;
}) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [formStep, setFormStep] = useState(1);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOverallError, setShowOverallError] = useState(false);

  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
      setPhoneNumberError("");
    }
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneNumberError("Phone number is required.");
    } else if (phoneNumber.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits.");
    }
  };
  useEffect(() => {
    if (formStep === 4) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [formStep]);

  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const nextFunction = () => {
    if (
      formStep === 1 &&
      firstName &&
      lastName &&
      email &&
      validateName(firstName) &&
      validateName(lastName) &&
      email.includes("@")
    ) {
      setFormStep(2);
      setShowOverallError(false);
    } else if (formStep === 2 && password && confirmPassword && phoneNumber) {
      signUpUser();
      setShowOverallError(false);
    } else if (formStep === 3 && otp) {
      verifyOtp();
      setShowOverallError(false);
    }

    if (formStep === 1 && !firstName) {
      setFirstNameError("first name is required");
      setShowOverallError(true);
    }
    if (formStep === 1 && !lastName) {
      setLastNameError("last name is required");
      setShowOverallError(true);
    }
    if (formStep === 1 && !validateName(firstName)) {
      setFirstNameError("first name must not contain number");
      setShowOverallError(true);
    }
    if (formStep === 1 && !validateName(lastName)) {
      setLastNameError("last name must not contain number");
      setShowOverallError(true);
    }
    if (formStep === 1 && !email) {
      setEmailError("Email is required");
      setShowOverallError(true);
    }
    if (formStep === 1 && !email.includes("@")) {
      setEmailError("Email is invalid");
      setShowOverallError(true);
    }
    
    if (formStep === 2 && !phoneNumber) {
      setPhoneNumberError("Phone number is required");
      setShowOverallError(true);
    }
    if (formStep === 2 && !password) {
      setPasswordError("Password is required");
      setShowOverallError(true);
    }
    if (formStep === 2 && !confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      setShowOverallError(true);
    }
    if (formStep === 3 && !otp) {
      setOtpError("Otp is required");
      setShowOverallError(true);
    }
  };

  const signUpUser = async () => {
    setShowLoader(true);
    if (confirmPassword !== password) {
      setPasswordError("Password must be same");
      setConfirmPasswordError("Password must be the same");
      setShowOverallError(true);
      setShowLoader(false);
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be more than 6 characters");
      setShowOverallError(true);
      setShowLoader(false);
      return;
    }
    const validatePassword = (password: string) => {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;

      return passwordRegex.test(password);
    };

    if (!validatePassword(password)) {
      setShowOverallError(true);
      setPasswordError(
        "Password must contain at least one uppercase letter, one number, and one special character"
      );

      setShowLoader(false);
      return;
    }

    if (!email.includes("@")) {
      setEmailError("Email must contain @");
      setShowOverallError(true);
      setShowLoader(false);
      return;
    }

    if (phoneNumber.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits");
      setShowOverallError(true);
      setShowLoader(false);
      return;
    }

    try {
      setShowOverallError(false);
      setPasswordError("");
      setConfirmPasswordError("");
      setPhoneNumberError("");
      const response = await apiClient.post("/api/v1/auth/register-user", {
        firstName,
        lastName,
        email,
        phoneNumber: countryCode + phoneNumber,
        password,
      });
      console.log(response);
     sessionStorage.setItem("token", response.data.data.token)
      toast(
        `otp sent to ${email} and ${phoneNumber}, but for the purpose of testing, otp is ` +
          response.data.data.user.otp,
        {
          duration: 10000,
          dismissible: true,
        }
      );
      setFormStep(3);

      setShowLoader(false);
    } catch (err: any) {
      console.log(err);
      setShowLoader(false);
      console.log(err.response.data.message.includes("email"));
      if (err.response.data.message.includes("email")) {
        setEmailError("email already exists, go back and change");
        toast("email already exists");
        setShowOverallError(true);
      }
    }
  };

  const verifyOtp = async () => {
    setShowLoader;
    try {
      const response = await apiClient.post("/api/v1/auth/verify-user-otp", {
        otp,
        email,
      });
      console.log(response);
      setFormStep(4);
      toast("user registered successfully");
      setShowLoader(false);
    } catch (err) {
      console.log(err);
      setOtpError("Invalid or expired otp");
      setShowOverallError(true);
      setShowLoader(false);
    }
  };

  return (
    <div className="flex w-full items-center flex-col gap-10">
      {showOverallError && formStep !== 4 && (
        <div className="absolute top-24 rounded  duration-500 transition-all ease-linear items-center flex w-[90%]  sm:w-[555px] bg-red-200 border-red-600 border-2 px-2 ">
          <div className="flex-grow flex flex-col justify-center  text-red-600 min-h-10  max-h-15">
            {formStep === 1 && firstNameError && <div>{firstNameError}</div>}
            {formStep === 1 && lastNameError && <div>{lastNameError}</div>}
            {formStep === 1 && emailError && <div>{emailError}</div>}
            {formStep === 2 && emailError && <div>{emailError}</div>}
            {formStep === 2 && phoneNumberError && (
              <div>{phoneNumberError}</div>
            )}
            {formStep === 2 && passwordError && <div>{passwordError}</div>}

            {formStep === 3 && <>{otpError}</>}
          </div>

          <div
            onClick={() => setShowOverallError(false)}
            className="cursor-pointer text-red-500 "
          >
            X
          </div>
        </div>
      )}

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
              <Button
               
                className=" bg-black border-gray-300 border-[2px] rounded-none transition-all duration-300 hover:text-white/60 text-white sm:w-[146px] h-[48px]"
              >
                Individual
              </Button>
              <Button  onClick={() => setDisplay("corporate")} className="bg-white rounded-none transition-all duration-300 hover:text-white/70 text-black/80 sm:w-[146px] h-[48px]">
                Corporate
              </Button>
            </div>
          </>
        )}

        {formStep === 3 && (
          <>
            <div className="text-2xl w-full sm:text-3xl text-center">
              Account details
            </div>
            <div className="mt-2 mb-8 text-[13px] sm:text-[16px] w-full text-center">
              Sign up for an account and start trading today
            </div>
          </>
        )}

        <div className="flex flex-col w-full gap-4 mt-8">
          {/* stage 1 form */}
         

          {formStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex w-full flex-1 flex-col">
                  <label className="mb-2">Your First Name</label>
                  <Input
                    type="text"
                    value={firstName}
                    className={`w-full rounded-none ${
                      firstNameError && "border-red-500"
                    }`}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                  <p className="text-[12px] text-red-600">{firstNameError}</p>
                </div>

                <div className="flex w-full flex-1 flex-col">
                  <label className="mb-2">Your last Name</label>
                  <Input
                    type="text"
                    value={lastName}
                    className={`w-full rounded-none ${
                      lastNameError && "border-red-500"
                    }`}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                  <p className="text-[12px] text-red-600">{lastNameError}</p>
                </div>
              </div>
              <div className="flex w-full flex-col ">
                <label className="mb-2">Your Email</label>
                <Input
                  type="email"
                  value={email}
                  className={`w-full rounded-none ${
                    emailError && "border-red-600"
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your company email"
                />
                <p className="text-[12px] text-red-600">{emailError}</p>
              </div>
            </div>
          )}

          {/* stage 2 form */}
          {formStep === 2 && (
            <div className="flex flex-col gap-6">
              <div>
              <div className="text-2xl w-full sm:text-3xl text-center">
              Register new account
            </div>
            <div className="mt-2 mb-8 text-[13px] sm:text-[16px] w-full text-center">
              Sign up for an account and start trading today
            </div>
                </div>
              
              <div className="flex w-full flex-col ">
                <label className="mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  className={`w-full rounded-none ${
                    passwordError && "border-red-600"
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <p className="text-[12px] text-red-600">{passwordError}</p>
              </div>

              <div className="flex w-full flex-col ">
                <label className="mb-2">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  className={`w-full rounded-none ${
                    confirmPasswordError && "border-red-600"
                  }`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <p className="text-[12px] text-red-600">
                  {confirmPasswordError}
                </p>
              </div>

              <div className="flex w-full flex-col">
                <label className="mb-2">Phone Number</label>
                <div className="flex gap-4">
                  <Select
                    onValueChange={(value) => setCountryCode(value)}
                    defaultValue={countryCode}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="+234" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map(({ code, label }) => (
                        <SelectItem key={label} value={code}>
                          {code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="tel"
                    value={phoneNumber}
                    className={`flex-grow rounded-none border-l-0 ${
                      phoneNumberError && "border-red-500"
                    }`}
                    onChange={handlePhoneChange}
                    onBlur={validatePhoneNumber}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Error Message */}
                {phoneNumberError && (
                  <p className="text-[12px] text-red-600 mt-1">
                    {phoneNumberError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* stage 3 form */}
          {formStep === 3 && (
            <div className="flex flex-col gap-6">
              <div className="flex w-full flex-col ">
                <label className="text-[14px] mb-2 sm:text-[16px]">
                  Enter the 4 digit  code  that was sent to {email} and{" "}
                  { countryCode + phoneNumber}
                </label>
                <Input
                  type="text"
                  maxLength={4}
                  value={otp}
                  className={`w-full rounded-none ${
                    otpError && "border-red-600"
                  }`}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your code"
                />
                <p className="text-[12px] text-red-600">{otpError}</p>

                <div className="cursor-pointer mt-6 mb-2 text-[14px] text-black/60">
                  Resend code
                </div>
                <div className="cursor-pointer text-[14px] text-black/60">
                  Verify via phone call
                </div>
              </div>
            </div>
          )}

          {/* stage 4 form */}
          {formStep === 4 && (
            <div className="flex flex-col gap-6">
              {showConfetti && <Confetti width={1000} height={1000} />}
              <div className="flex w-full items-center flex-col gap-2">
                <img src={SuccessImage} alt="success" className="w-[50%]" />
                <label className="text-3xl text-center mt-10">
                  Registration Complete
                </label>
                <p className="text-center text-[12px]">
                  Dear {firstName}. Your registration is now complete. You may
                  proceed to your dashboard and start trading commodities.
                </p>

                <div
                  onClick={() => navigate("/dashboard")}
                  className="text-[#D71E0E] text-center uppercase mt-10 cursor-pointer"
                >
                  Go to dashboard
                </div>
              </div>
            </div>
          )}

          {formStep !== 4 && !showLoader && (
            <div
              onClick={nextFunction}
              className="text-center text-xl uppercase cursor-pointer mt-10 text-[#D71E0E]"
            >
              Next Step
            </div>
          )}
          {showLoader && (
            <div className="flex items-center justify-center">
              <CustomLoaderCircle color="#D71E0E" />
            </div>
          )}
        </div>
      </div>

      <div className="flex text-gray-700 justify-center">{formStep}/4</div>

      <div className="w-full flex justify-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            formStep < 3 && setFormStep(1);
          }}
        >
          <div className="w-3 h-3 bg-[#D71E0E] rounded-full"></div>
          <div className="h-1 w-20   bg-[#D71E0E]"></div>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            formStep < 3 && lastName && firstName && email && setFormStep(2);
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
          className="flex items-center cursor-pointer"
          onClick={() => {
            formStep !== 4 &&
              lastName &&
              firstName &&
              email &&
              password &&
              confirmPassword &&
              phoneNumber &&
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
      </div>
    </div>
  );
};

export default RegisterUser;

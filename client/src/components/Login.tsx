import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { apiClient } from "../lib/apiClient";
import { toast } from "sonner";
import CustomLoaderCircle from "./LoaderCircle";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [showOverallError, setShowOverallError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setTermsError("");
    setShowOverallError(false);

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!acceptTerms) {
      setTermsError("Click on stayed signed in to continue");
      valid = false;
    }

    return valid;
  };

  const signIn = async () => {
    if (!validateInputs()) {
      return;
    }

    setShowLoader(true);
    try {
      const response = await apiClient.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token)

      toast("Login successful!", {
        duration: 3000,
        dismissible: true,
      });

      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err:any) {
      if (err.response?.data?.message?.includes("email")) {
        setEmailError("Invalid email or password");
      } 
      
      if (err.response?.data?.message?.includes("password")) {
        setPasswordError("Incorrect password");
      } 
      toast(err.response?.data?.message)
    }
    setShowLoader(false);
  };

  return (
    <div className="flex w-full items-center flex-col gap-10">
      {showOverallError && (
        <div className="fixed top-24 rounded transition-all duration-500 ease-linear flex items-center w-[90%] sm:w-[555px] bg-red-200 border-red-600 border-2 px-2">
          <div className="flex-grow flex flex-col justify-center text-red-600 min-h-10 max-h-15">
            {emailError && <div>{emailError}</div>}
            {passwordError && <div>{passwordError}</div>}
          </div>
          <div
            onClick={() => setShowOverallError(false)}
            className="cursor-pointer text-red-500"
          >
            X
          </div>
        </div>
      )}

      <div className="w-full sm:w-[555px] flex flex-col items-start py-12 px-6 sm:p-12 bg-white">
        <div className="text-2xl w-full sm:text-3xl text-center">
          Sign in to Comx
        </div>
        <div className="mt-2 mb-8 text-[13px] sm:text-[16px] w-full text-center">
          Enter your login credentials below
        </div>

        <div className="flex flex-col w-full gap-4 mt-8">
          <div className="flex flex-col gap-6">
            <div className="flex w-full flex-col">
              <label className="mb-2">Your Email</label>
              <Input
                type="email"
                value={email}
                className={`w-full rounded-none ${emailError && "border-red-600"}`}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <p className="text-[12px] text-red-600">{emailError}</p>
            </div>

            <div className="flex w-full flex-col">
              <label className="mb-2">Password</label>
              <Input
                type="password"
                value={password}
                className={`w-full rounded-none ${passwordError && "border-red-600"}`}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <p className="text-[12px] text-red-600">{passwordError}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={()=>setAcceptTerms(!acceptTerms)} />
                <label htmlFor="terms" className="text-sm font-medium leading-none">
                  Stay signed in
                </label>
              </div>
             
              <div onClick={() => navigate('/sign-in/password-reset')} className="text-[#D71E0E] cursor-pointer text-sm text-end">
                Forgot Password?
              </div>
              
            </div>
            <p className="text-[12px] -mt-4 text-red-600">{termsError}</p>
            
          </div>

          {showLoader && (
            <div className="flex items-center justify-center">
              <CustomLoaderCircle color="#D71E0E" />
            </div>
          )}

          <Button
            disabled={showLoader}
            onClick={signIn}
            className="bg-green-600 rounded-none transition-all duration-300 hover:bg-green-500 text-white w-full h-[48px]"
          >
            Sign in
          </Button>

          <Button
            disabled={showLoader}
            onClick={() => navigate(-1)}
            className="bg-gray-600/10 rounded-none transition-all duration-300 hover:bg-gray-600/30 text-gray-800 w-full h-[48px]"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

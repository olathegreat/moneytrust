import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { apiClient } from "../lib/apiClient";
import { toast } from "sonner";
import CustomLoaderCircle from "./LoaderCircle";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [overallError, setOverallError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendToken = async () => {
    setEmailError("");
    setOverallError("");

    // Client-side validation
    if (!email) {
      setEmailError("Email field cannot be empty");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    setShowLoader(true);

    try {
      const response = await apiClient.post("/api/v1/auth/send-user-reset-otp", { email });

      sessionStorage.setItem("email", email);

      toast.success(response?.data?.message || "OTP sent successfully!", {
        duration: 3000,
        dismissible: true,
      });

      navigate("/sign-in/confirm-otp");
    } catch (err: any) {
      console.error("Password Reset Error:", err);

      // Handle different types of errors
      if (err.response) {
        // API responded with an error
        const status = err.response.status;
        const errorMessage = err.response.data?.message || "Something went wrong";

        if (status === 404) {
          setEmailError("This email does not exist in our records");
        } else if (status === 400) {
          setEmailError(errorMessage);
        } else {
          setOverallError(errorMessage);
        }
      } else if (err.request) {
        // Network error or no response
        setOverallError("Network error. Please check your connection.");
      } else {
        // Unknown error
        setOverallError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="flex w-full items-center flex-col gap-10">
      {overallError && (
        <div className="fixed top-24 rounded-lg transition-all duration-500 ease-linear flex items-center w-[90%] sm:w-[555px] bg-red-200 border-red-600 border-2 p-4">
          <div className="flex-grow flex flex-col justify-center text-red-600 min-h-10 max-h-15">
            <div>{overallError}</div>
          </div>
          <div onClick={() => setOverallError("")} className="cursor-pointer text-red-500">
            X
          </div>
        </div>
      )}

      <div className="w-full sm:w-[555px] flex flex-col items-start py-12 px-6 sm:p-12 bg-white">
        <div className="text-2xl w-full sm:text-3xl text-center">Password Reset</div>
        <div className="mt-2 mb-8 text-[13px] sm:text-[16px] w-full text-center">
          Reset your password to continue trading on Comx
        </div>

        <div className="flex flex-col w-full gap-4 mt-8">
          <div className="flex flex-col gap-6">
            <div className="flex w-full flex-col">
              <label className="mb-2">Enter the Email Address you registered with</label>
              <Input
                type="email"
                value={email}
                className={`w-full rounded-none ${emailError && "border-red-600"}`}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <p className="text-[12px] text-red-600">{emailError}</p>

              <p className="text-gray-500 text-[14px] mt-4 text-center">
                Note: An OTP will be sent to the email address provided.
              </p>
            </div>
          </div>

          {showLoader && (
            <div className="flex items-center justify-center">
              <CustomLoaderCircle color="#D71E0E" />
            </div>
          )}
        </div>

        <div className="flex mt-40 w-full justify-between">
          <Button
            className="bg-gray-100 hover:bg-gray-100 hover:text-gray-800/80 duration-300 transition-all text-gray-800"
            onClick={() => navigate("/sign-in")}
          >
            BACK
          </Button>

          <Button
            className="bg-gray-100 hover:bg-gray-100 hover:text-gray-800/80 duration-300 transition-all text-[#D71E0E]"
            onClick={sendToken}
            disabled={showLoader}
          >
            {showLoader ? "Processing..." : "PROCEED"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

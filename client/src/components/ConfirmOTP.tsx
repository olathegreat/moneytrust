import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { apiClient } from "../lib/apiClient";
import { toast } from "sonner";
import CustomLoaderCircle from "./LoaderCircle";
import { useNavigate } from "react-router-dom";

const ConfirmOTP = () => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOverallError, setShowOverallError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  const sendToken = async () => {
    if (!email) {
      navigate("/sign-in/password-reset");
      return;
    }

    setShowLoader(true);
    setShowOverallError(false);
    try {
      const response = await apiClient.post("/api/v1/auth/send-user-reset-otp", { email });
      sessionStorage.setItem("email", email);
      toast(response?.data?.message, { duration: 3000, dismissible: true });
    } catch (err) {
      toast("Failed to send OTP. Please try again.", { duration: 3000, dismissible: true });
    } finally {
      setShowLoader(false);
    }
  };

  const confirmOTPFunction = async () => {
    if (!otp.trim()) {
      setOtpError("Please enter the OTP.");
      return;
    }

    setShowLoader(true);
    setOtpError("");
    setShowOverallError(false);
    try {
      await apiClient.post("/api/v1/auth/verify-reset-otp", { email, otp });
      toast("OTP confirmed", { duration: 3000, dismissible: true });
      navigate("/dashboard");
    } catch (err) {
      setOtpError("OTP code is invalid");
      setShowOverallError(true);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="flex  w-full items-center flex-col gap-10">
      <div className="w-full relative sm:w-[555px] flex flex-col items-start py-12 px-6 sm:p-12 bg-white">
        <h2 className="text-2xl sm:text-3xl text-center w-full">Password Reset</h2>
        <p className="mt-2 mb-8 text-[13px] sm:text-[16px] text-center">
          Reset your password to continue trading on Comx
        </p>

        <div className="flex flex-col w-full gap-4 mt-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="mb-2">Enter the 4-digit code sent to you</label>
              <Input
                type="text"
                value={otp}
                className={`w-full rounded-none ${otpError && "border-red-600"}`}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter code"
              />
              {otpError && <p className="text-[12px] text-red-600">{otpError}</p>}
              <p onClick={sendToken} className="text-gray-200 text-[14px] cursor-pointer mt-4 text-center">
                Resend Code
              </p>
            </div>
          </div>

          {showOverallError && (
            <div className="absolute bottom-44 transition-all duration-500 ease-linear flex items-center w-[90%] sm:w-[82%] rounded-lg bg-red-200 border-red-600 border-2 p-4">
              <div className="flex-grow flex flex-col justify-center text-red-600 min-h-10 max-h-15">
                {otpError && <div>{otpError}</div>}
              </div>
              <div
                onClick={() => setShowOverallError(false)}
                className="cursor-pointer text-red-500"
              >
                X
              </div>
            </div>
          )}

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

          <Button className="bg-gray-100 hover:bg-gray-100 hover:text-gray-800/80 duration-300 transition-all text-[#D71E0E]" onClick={confirmOTPFunction}>
            FINISH
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOTP;

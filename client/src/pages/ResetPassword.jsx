import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const handleSendOtp = async () => {
    try {
     
      alert("OTP sent to " + email);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="p-6 shadow-lg rounded-lg flex flex-col bg-white gap-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center text-gray-700">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 rounded-lg outline-none border-2 border-gray-300 focus:border-indigo-500 bg-slate-50 text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOtp}
          className="py-2 rounded-md shadow-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
        >
          Send OTP
        </button>

        <p className="text-sm text-center text-gray-500">We will send a one-time password  to your registered email address.</p>
      </div>
    </div>
  );
};

export default ResetPassword;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    // Replace with your verify API call
    try {
      const response = await axios.post(
        "http://localhost:3000/api/verify-email",
        { code },
        {
          withCredentials: true,
        },
      );
      console.log(response);

      const { message, success, user } = response.data;
      console.log(message, success);
      if (success) {
        navigate("/profile");
        // localStorage.setItem("user", JSON.stringify(user));
        alert("Email verified successfully!");
      } else {
        setError({ message });
      }
    } catch (error) {
      alert(setError("Network error. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-sm shadow-2xl text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-indigo-500/30 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-indigo-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">
            Verify Email
          </h1>
          <p className="text-slate-300 text-sm">
            Enter 6-digit code sent to your email
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Single Code Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-4 text-center">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="000000"
              maxLength={6}
              className="w-full px-8 py-6 bg-white/10 border-2 border-white/20 rounded-2xl text-2xl font-mono text-center tracking-widest text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:border-white/40"
              disabled={loading}
            />
            <p className="text-xs text-slate-400 mt-2">
              Enter 6-digit code (Enter to submit)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/50 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        {/* Resend Link */}
        <div className="mt-6">
          <button
            type="button"
            disabled={loading}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors disabled:opacity-50"
            onClick={() => alert("Resend functionality - implement API call")}
          >
            Didn't receive code? Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

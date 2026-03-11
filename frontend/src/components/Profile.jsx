import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../apis/FetchUserProfile";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {

  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-lg shadow-2xl hover:shadow-3xl transition-all duration-500 group">
        {/* Profile Card Header */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2 hover:from-emerald-400 hover:to-teal-500 transition-all duration-500">
            Welcome to your profile!
          </h1>
          <p className="text-slate-300 text-lg">Manage your account details</p>
        </div>

        {/* User Info Cards */}
        <div className="space-y-6 mb-10">
          <div className="group/profile-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-200 group-hover/profile-item:text-white transition-colors">
                  Name
                </h3>
                <p className="text-slate-300 text-lg mt-1 font-medium group-hover/profile-item:text-emerald-100">
                  {data?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="group/profile-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              <div>
                <h3 className="text-xl font-semibold text-slate-200 group-hover/profile-item:text-white transition-colors">
                  Email
                </h3>
                <p className="text-slate-300 text-lg mt-1 font-medium group-hover/profile-item:text-blue-100 break-all">
                  {data?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-8 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-red-600 hover:to-rose-700 focus:ring-4 focus:ring-red-500/50 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl group/btn"
          >
            <span className="flex items-center justify-center group-hover/btn:translate-x-1 transition-transform duration-300">
              <svg
                className="w-5 h-5 mr-2 -translate-x-1 group-hover/btn:translate-x-0 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
              Logout
            </span>
          </button>
        </div>

        {/* Stats Row */}
        <div className=" flex justify-center items-center gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="text-center px-10 py-4 cursor-pointer bg-white/5 rounded-xl hover:bg-white/10 transition-all">
            <div className="text-2xl font-bold text-emerald-400">✓</div>
            <p className="text-slate-300 text-sm mt-1">
              {data?.isVerified ? "Email Verified" : "Verify your Email"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

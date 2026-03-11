import axios from "axios";

export const getUserProfile = async () => {
  const response = await axios.get("http://localhost:3000/api/profile", {
    withCredentials: true,
  });
  return response.data.user;
};

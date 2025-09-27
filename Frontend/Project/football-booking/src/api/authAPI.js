import axios from "axios";
const BASE_URL = "https://localhost:7099/api";
export const LoginAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/Auth/Login`, data);
  return response.data;
};
export const SignInAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/Auth/SignIn`, data);

  return response.data;
};

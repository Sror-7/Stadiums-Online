import axios from "axios";
// import { userToken } from "../utils/global";
import { getUserToken } from "../utils/global";
const BASE_URL = "https://localhost:7099/api";

export const signInNewUser = async (newUser) => {
  const response = await axios.post(`${BASE_URL}/User/Add`, newUser);
  return response.data;
};
export const fetchUserInfoByID = async () => {
  const response = await axios.get(`${BASE_URL}/User/Get`, {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
  return response.data;
};
export const IsUsernameAvailableAPI = async (Username, UserID) => {
  const response = await axios.get(
    `${BASE_URL}/User/UsernameAvailabilityCheck`,
    {
      params: { Username, UserID },
    }
  );
  return response.data;
};
export const IsEmailAvailableAPI = async (email, userId) => {
  console.log(" check email: ", email);
  const response = await axios.get(`${BASE_URL}/User/EmailAvailabilityCheck`, {
    params: { email, userId },
  });
  return response.data;
};
export const IsPasswordCorrectAPI = async ({ password }) => {
  console.log("Password api: ", password);

  const response = await axios.get(`${BASE_URL}/User/IsPassowrdCorrect`, {
    params: { password },
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });

  return response.data;
};

export const getUserInfoByUsernameAndPasswordAPI = async (
  Username,
  Password
) => {
  const response = await axios.get(
    `${BASE_URL}/User/GetByUsernameAndPassword`,
    {
      params: { Username, Password },
    }
  );
  return response.data;
};
export const UpdateUserAPI = async (data) => {
  const response = await axios.put(`${BASE_URL}/User/Update`, data);
  return response.data;
};
export const ChangeUserPasswordAPI = async ({ current, newPassword }) => {
  const response = await axios.put(
    `${BASE_URL}/User/ChangePassword`,
    { current, newPassword },
    {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );

  return response.data;
};

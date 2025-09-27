import axios from "axios";
import { getUserToken } from "../utils/global";
const BASE_URL = "https://localhost:7099/api";
export const AddNewPersonAPI = async (newPerson) => {
  const response = await axios.post(`${BASE_URL}/Person/Add`, newPerson);
  return response.data;
};
export const UpdatePersonAPI = async ({ id, patchData }) => {
  const response = await axios.patch(
    `${BASE_URL}/Person/Patch/${id}`,
    patchData,
    {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
        "Content-Type": "application/json-patch+json",
      },
    }
  );
  return response.data;
};
export const updatePersonImageAPI = async ({ id, imageFile }) => {
  const token = localStorage.getItem("stadiumsApp.accessToken");

  const formData = new FormData();
  formData.append("ImageFile", imageFile);

  const response = await axios.put(
    `${BASE_URL}/Person/UpdateImage/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getPersonInfoByIDAPI = async (personID) => {
  const response = await axios.get(`${BASE_URL}/Person/Get`, {
    params: { personID },
  });
  return response.data;
};

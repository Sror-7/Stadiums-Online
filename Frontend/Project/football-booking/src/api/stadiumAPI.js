import axios from "axios";
import { getUserToken } from "../utils/global";

const BASE_URL = "https://localhost:7099/api";
export const getAllStadiumsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/Stadium/All`);
  return response.data;
};
export const getAllStadiumsWithSettingsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/Stadium/AllWithSettings`);
  return response.data;
};
export const addNewStadiumAPI = async (newStadium) => {
  const response = await axios.post(`${BASE_URL}/Stadium/Add`, newStadium, {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
      "Content-Type": "application/json-patch+json",
    },
  });
  return response.data;
};

export const getStadiumInfoWithBookingsByStadiumIDAPI = async ({
  stadiumId,
  choosedDate,
}) => {
  const response = await axios.get(`${BASE_URL}/Stadium/WithBookings`, {
    params: {
      stadiumId: stadiumId,
      Date: choosedDate,
    },
  });
  return response.data;
};
export const getStadiumInfoByIDAPI = async ({ stadiumId }) => {
  const response = await axios.get(`${BASE_URL}/Stadium/Get`, {
    params: {
      StadiumID: stadiumId,
    },
  });
  return response.data;
};
export const getStadiumInfoByOwnerIDAPI = async ({ ownerID }) => {
  const response = await axios.get(`${BASE_URL}/Stadium/GetByOwnerID`, {
    params: {
      OwnerID: ownerID,
    },
  });
  return response.data;
};
export const getStadiumSettingsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/Stadium/GetBookingSettings`, {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
  return response.data;
};
export const getStadiumInfoByLoggedUserAPI = async () => {
  const response = await axios.get(`${BASE_URL}/Stadium/GetByLoggedUser`, {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
  return response.data;
};
export const updateStadiumAPI = async ({ id, patchData }) => {
  const response = await axios.patch(
    `${BASE_URL}/Stadium/Patch/${id}`,
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
export const updateStadiumImageAPI = async ({ id, imageFile }) => {
  const formData = new FormData();
  formData.append("ImageFile", imageFile);

  const response = await axios.put(
    `${BASE_URL}/Stadium/UpdateImage/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  );

  return response.data;
};

export const updateStadiumBookingSettingsAPI = async ({ id, patchData }) => {
  const response = await axios.patch(
    `${BASE_URL}/Stadium/PatchBookingSettings/${id}`,
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
export const IsStadiumNameAvailableAPI = async (stadiumName, stadiumID) => {
  console.log("check stadium name APIP");
  console.log("stadiumName: ", stadiumName);
  console.log("stadiumID: ", stadiumID);
  const response = await axios.get(
    `${BASE_URL}/Stadium/StadiumNameAvailabilityCheck`,
    {
      params: { stadiumName, stadiumID },
    }
  );
  return response.data;
};

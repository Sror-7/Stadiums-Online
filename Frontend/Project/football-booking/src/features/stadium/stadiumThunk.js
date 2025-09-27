import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllStadiumsAPI,
  addNewStadiumAPI,
  getStadiumInfoWithBookingsByStadiumIDAPI,
  getStadiumInfoByIDAPI,
  updateStadiumAPI,
  updateStadiumImageAPI,
  updateStadiumBookingSettingsAPI,
  getStadiumInfoByLoggedUserAPI,
  getStadiumInfoByOwnerIDAPI,
  IsStadiumNameAvailableAPI,
  getStadiumSettingsAPI,
  getAllStadiumsWithSettingsAPI,
} from "../../api/stadiumAPI";

export const getAllStadiums = createAsyncThunk(
  "stadiums/getAllStadiums",
  async () => {
    const data = await getAllStadiumsAPI();
    return data;
  }
);
export const getAllStadiumsWithSettings = createAsyncThunk(
  "stadiums/getAllStadiums",
  async () => {
    const data = await getAllStadiumsWithSettingsAPI();
    return data;
  }
);
export const getStadiumInfoWithBookingsByID = createAsyncThunk(
  "stadiums/getStadiumInfoWithBookingsByStadiumID",
  async ({ stadiumId, choosedDate }) => {
    const data = await getStadiumInfoWithBookingsByStadiumIDAPI({
      stadiumId,
      choosedDate,
    });

    return data;
  }
);
export const getStadiumInfoByID = createAsyncThunk(
  "stadiums/getStadiumInfoByStadiumID",
  async ({ stadiumId }) => {
    const data = await getStadiumInfoByIDAPI({
      stadiumId: stadiumId,
    });

    return data;
  }
);
export const getStadiumInfoByLoggedUser = createAsyncThunk(
  "stadiums/getStadiumInfoByLoggedUser",
  async () => {
    const data = await getStadiumInfoByLoggedUserAPI();

    return data;
  }
);
export const getStadiumInfoByOwnerID = createAsyncThunk(
  "stadiums/getStadiumInfoByOwnerID",
  async ({ ownerID }) => {
    const data = await getStadiumInfoByOwnerIDAPI({
      ownerID: ownerID,
    });

    return data;
  }
);
export const getStadiumSettingsByStadiumID = createAsyncThunk(
  "stadiums/getStadiumInfoByOwnerID",
  async () => {
    const data = await getStadiumSettingsAPI();

    return data;
  }
);

export const addNewStadium = createAsyncThunk(
  "stadiums/addNewStadium",
  async (stadiumData, thunkAPI) => {
    try {
      const response = await addNewStadiumAPI(stadiumData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateStadiumInfo = createAsyncThunk(
  "stadium/updateStadium",
  async ({ id, patchData }, thunkAPI) => {
    try {
      const res = await updateStadiumAPI({ id, patchData });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
export const updateStadiumImage = createAsyncThunk(
  "stadium/updateStadiumImage",
  async ({ id, imageFile }, thunkAPI) => {
    try {
      const res = await updateStadiumImageAPI({ id, imageFile });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
export const updateStadiumBookingSettings = createAsyncThunk(
  "stadium/updateStadiumBookingSettings",
  async ({ id, patchData }, thunkAPI) => {
    try {
      const res = await updateStadiumBookingSettingsAPI({
        id,
        patchData,
      });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
// export const updateStadiumBookingSettings = createAsyncThunk(
//   "stadium/updateStadiumBookingSettings",
//   async (data, thunkAPI) => {
//     try {
//       const res = await UpdateStadiumBookingSettingsAPI(data);
//       return res;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || "Update failed");
//     }
//   }
// );
export const IsStadiumNameAvailable = createAsyncThunk(
  "stadium/checkStadiumNameAvialability",
  async ({ stadiumName, stadiumID }, thunkAPI) => {
    try {
      const response = await IsStadiumNameAvailableAPI(stadiumName, stadiumID);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

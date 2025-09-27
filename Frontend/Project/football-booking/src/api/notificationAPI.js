import axios from "axios";
import { getUserToken } from "../utils/global";

const BASE_URL = "https://localhost:7099/api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getUserToken()}`,
  },
});

export const getAllNotificationsAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/Notification/All`,
    authHeader()
  );
  return response.data;
};

export const markNotificationAsReadAPI = async (notificationId) => {
  console.log("mark as read sror", notificationId);
  const response = await axios.put(
    `${BASE_URL}/Notification/MarkAsRead/${notificationId}`,
    {}
    // authHeader()
  );
  return response.data;
};

export const markAllNotificationsAsReadAPI = async () => {
  const response = await axios.put(
    `${BASE_URL}/Notification/MarkAllAsRead`,
    {},
    authHeader()
  );
  return response.data;
};

export const deleteNotificationAPI = async (notificationId) => {
  const response = await axios.delete(
    `${BASE_URL}/Notification/Delete/${notificationId}`,
    authHeader()
  );
  return response.data;
};

export const countUnreadNotificationsAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/Notification/CountUnread`,
    authHeader()
  );
  return response.data;
};

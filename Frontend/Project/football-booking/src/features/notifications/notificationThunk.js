import {
  getAllNotificationsAPI,
  markNotificationAsReadAPI,
  markAllNotificationsAsReadAPI,
  deleteNotificationAPI,
  countUnreadNotificationsAPI,
} from "../../api/notificationAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllNotifications = createAsyncThunk(
  "notification/getAllNotifications",
  async () => {
    const data = await getAllNotificationsAPI();
    return data;
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId) => {
    await markNotificationAsReadAPI(notificationId);
    return notificationId;
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async () => {
    await markAllNotificationsAsReadAPI();
    return true;
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async (notificationId) => {
    await deleteNotificationAPI(notificationId);
    return notificationId;
  }
);

export const countUnreadNotifications = createAsyncThunk(
  "notification/countUnread",
  async () => {
    const count = await countUnreadNotificationsAPI();
    return count;
  }
);

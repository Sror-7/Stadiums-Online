import { useState } from "react";
import {
  getAllNotificationsAPI,
  markNotificationAsReadAPI,
  markAllNotificationsAsReadAPI,
  deleteNotificationAPI,
} from "../../api/notificationAPI";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const LoadNotifications = async () => {
    setLoading(true);
    try {
      const data = await getAllNotificationsAPI();
      setNotifications(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    await markNotificationAsReadAPI(id);
    // حدث الـ state محلياً بعد نجاح الطلب
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = async () => {
    await markAllNotificationsAsReadAPI();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = async (id) => {
    await deleteNotificationAPI(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    loading,
    error,
    LoadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}

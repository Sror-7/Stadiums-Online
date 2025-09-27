import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { Done, Delete } from "@mui/icons-material";
import { useNotifications } from "../../../hooks/notifications/useNotifications";

export default function Notifications() {
  const {
    notifications,
    LoadNotifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  useEffect(() => {
    LoadNotifications();
  }, []);

  return (
    <Box pt={3}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={markAllAsRead}
          sx={{ textTransform: "none" }}
        >
          Mark All as Read
        </Button>
      </Box>

      <Grid container spacing={2} pt={3}>
        {notifications.length === 0 && (
          <Typography variant="body1">No notifications available.</Typography>
        )}

        {notifications.map((notification) => (
          <Grid size={{ xs: 12 }} key={notification.id}>
            <Card
              sx={{
                backgroundColor: notification.isRead ? "#f5f5f5" : "#6363632e",
                borderLeft: notification.isRead
                  ? "4px solid transparent"
                  : "4px solid #206c2a",
                position: "relative",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: notification.isRead ? "normal" : "bold",
                    width: "75%",
                  }}
                >
                  {notification.content}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  {notification.createdAt}
                </Typography>

                {/* Action Buttons */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {!notification.isRead && (
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as Read"
                    >
                      <Done />
                    </IconButton>
                  )}
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

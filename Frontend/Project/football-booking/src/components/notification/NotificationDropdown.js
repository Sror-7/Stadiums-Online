import React, { useState, useEffect } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NotificationDropdown({ notifications, onMarkAllRead }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge
          badgeContent={notifications.filter((n) => !n.isRead).length}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
          },
        }}
      >
        <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1">Notifications</Typography>
          <Button
            size="small"
            onClick={() => {
              onMarkAllRead();
              handleClose();
            }}
          >
            Mark all as read
          </Button>
        </Box>
        <Divider />

        {notifications.length === 0 && (
          <MenuItem onClick={handleClose}>
            <ListItemText primary="No notifications" />
          </MenuItem>
        )}

        {notifications.map((n) => (
          <MenuItem
            key={n.id}
            onClick={handleClose}
            sx={{
              backgroundColor: n.isRead ? "transparent" : "rgba(0,0,0,0.05)",
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: n.isRead ? "normal" : "bold",
                    whiteSpace: "normal", // 👈 يسمح بالنزول للسطر التالي
                    wordBreak: "break-word", // 👈 يكسر الكلمات الطويلة إذا لزم
                  }}
                >
                  {n.content}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {new Date(n.createdAt).toLocaleString()}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

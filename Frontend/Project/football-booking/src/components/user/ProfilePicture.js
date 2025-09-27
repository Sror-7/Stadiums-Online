import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Profile_Img_Default from "../../imgs/profile-default.png";

export default function ProfilePicture({ imageUrl, onUpdate }) {
  const fileInputRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [image, setImage] = useState(imageUrl);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    if (file && onUpdate) {
      onUpdate(file);
    }
  };

  const handleRemoveClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmRemove = () => {
    setOpenDialog(false);
    setImage(null);
    if (onUpdate) onUpdate(null);
  };

  const handleCancelRemove = () => {
    setOpenDialog(false);
  };

  return (
    <Box textAlign="center" mb={2}>
      <Avatar
        src={image ? image : Profile_Img_Default}
        alt="Profile Picture"
        sx={{ width: 120, height: 120, margin: "0 auto", mb: 1 }}
      />

      <Box display="flex" justifyContent="center" gap={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => fileInputRef.current.click()}
          //   disabled={!isEditing}
        >
          Select
        </Button>
        {image ? (
          <Button
            variant="text"
            size="small"
            color="error"
            onClick={handleRemoveClick}
            //   disabled={!isEditing}
          >
            Remove
          </Button>
        ) : (
          <></>
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />

      {/* Confirm Dialog */}
      <Dialog open={openDialog} onClose={handleCancelRemove}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the picture?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove}>Cancel</Button>
          <Button color="error" onClick={handleConfirmRemove}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import stadium_Img_Default from "../../imgs/stadium-default.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import { getObjectDiffPatch } from "../../utils/global";
import ImageModal from "../../utils/Images/ImageUpload";
import { updateStadiumImage } from "../../features/stadium/stadiumThunk";
import { ConfirmDialog } from "../myComponents/ConfirmDialog";
import { useDispatch } from "react-redux";

export function ShowStadiumSettingsCard({ StadiumInformation, onUpdate }) {
  const dispatch = useDispatch();
  const [isEditingStadiumInfo, setIsEditingStadiumInfo] = useState(false);

  const [stadium, setStadium] = useState({
    id: 0,
    ownerID: 0,
    name: "",
    country: "",
    city: "",
    description: "",
    phone: "",
    phoneCode: "",
    email: "",
    imageUrl: "",
    createdDate: "",
  });
  const [updatedInfo, setUpdatedInfo] = useState(stadium);
  const [stadiumImageURL, setStadiumImageURL] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowCropper(true);
    }
  }

  function handleCancelImg() {
    setShowCropper(false);
    setSelectedImage(null);
  }

  function handleSaveImg(croppedFile) {
    dispatch(
      updateStadiumImage({ id: StadiumInformation.id, imageFile: croppedFile })
    );
    setStadiumImageURL(URL.createObjectURL(croppedFile));

    setShowCropper(false);
  }
  useEffect(() => {
    setStadiumImageURL(StadiumInformation.imageUrl);
    setStadium(StadiumInformation);
    setUpdatedInfo(StadiumInformation);
  }, [StadiumInformation]);

  const handleChange = (field, value) => {
    setUpdatedInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const patchData = getObjectDiffPatch(stadium, updatedInfo);
    if (onUpdate) {
      onUpdate(patchData);
    }

    setStadium(updatedInfo);
    setIsEditingStadiumInfo(false);
  };
  function handleRemoveImage() {
    setShowConfirmDialog(true);
  }
  function handleCancellRemoveImage() {
    setShowConfirmDialog(false);
  }
  function handleConfirmRemoveImage() {
    setStadiumImageURL(null);
    dispatch(updateStadiumImage({ id: 1, imageFile: null }));

    setShowConfirmDialog(false);
  }

  return (
    <Grid size={{ xs: 12 }}>
      {showConfirmDialog && (
        <ConfirmDialog
          open={true}
          message={"Are you sure you want remove this image?"}
          onConfirm={handleConfirmRemoveImage}
          onCancel={handleCancellRemoveImage}
        />
      )}
      {showCropper && (
        <ImageModal
          imageSrc={selectedImage}
          onSave={handleSaveImg}
          onCancel={handleCancelImg}
        />
      )}
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            display="flex"
            alignItems="center"
            style={{ marginBottom: "15px" }}
          >
            Stadium Information{" "}
            <IconButton
              onClick={() => setIsEditingStadiumInfo(!isEditingStadiumInfo)}
            >
              <EditIcon />
            </IconButton>
          </Typography>

          {isEditingStadiumInfo ? (
            <>
              <TextField
                fullWidth
                label="اسم الملعب"
                name="name"
                value={updatedInfo.name}
                onChange={(e) => handleChange("name", e.target.value)}
                margin="normal"
              />
              {/* <TextField
                fullWidth
                label="الموقع"
                name="location"
                value={updatedInfo.location}
                onChange={(e) => handleChange("location", e.target.value)}
                margin="normal"
              /> */}

              <TextField
                fullWidth
                multiline
                label="الوصف"
                name="description"
                value={updatedInfo.description}
                onChange={(e) => handleChange("description", e.target.value)}
                margin="normal"
              />
            </>
          ) : (
            <>
              <Typography color="text.secondary">
                {"Stadium Name: " + stadium.name}
              </Typography>

              <Typography color="text.secondary">
                {stadium.country + ", " + stadium.city}
              </Typography>
              <Box
                position="relative"
                display="inline-block"
                width="100%"
                mt={2}
              >
                <img
                  src={stadiumImageURL ? stadiumImageURL : stadium_Img_Default}
                  alt="Stadium Img"
                  style={{
                    width: "100%",
                    maxHeight: 250,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                <IconButton
                  component="label"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <CameraAltIcon fontSize="small" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageSelect}
                    // onChange={(e) => setStadiumImageFile(e.target.files[0])}
                  />
                </IconButton>
                {stadiumImageURL && (
                  <IconButton
                    size="small"
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 45,
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    ❌
                  </IconButton>
                )}
              </Box>
              <Typography mt={2}>{stadium.description}</Typography>
            </>
          )}

          <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
          <Typography
            variant="h6"
            display="flex"
            alignItems="center"
            style={{ marginBottom: "15px" }}
          >
            📞 Contact
          </Typography>
          {isEditingStadiumInfo ? (
            <>
              <TextField
                fullWidth
                label="رقم الهاتف"
                name="phone"
                value={updatedInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                name="email"
                value={updatedInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
                margin="normal"
              />
            </>
          ) : (
            <>
              <Typography>📞 {stadium.phone}</Typography>
              <Typography>📧 {stadium.email}</Typography>
            </>
          )}

          {/* <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
          <Typography variant="h6" style={{ marginBottom: "15px" }}>
            ⚙️ Stadium availability
          </Typography>
          {isEditingStadiumInfo ? (
            <FormControlLabel
              control={
                <Switch
                  name="isAvailable"
                  checked={updatedInfo.isAvailable}
                  onChange={(e) =>
                    handleChange("isAvailable", e.target.checked)
                  }
                />
              }
              label="Is Stadium Available"
              sx={{ mt: 1 }}
            />
          ) : (
            <Typography>
              {stadium.isAvailable
                ? "Stadium is available"
                : "Stadium isn't available"}
            </Typography>
          )} */}

          {isEditingStadiumInfo && (
            <>
              <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
                حفظ التعديلات
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

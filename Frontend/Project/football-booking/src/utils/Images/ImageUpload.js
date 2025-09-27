import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Box,
} from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // دالة حساب الصورة المقصوصة

export default function ImageModal({ imageSrc, onSave, onCancel }) {
  const [isCropping, setIsCropping] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalImage, setFinalImage] = useState(imageSrc);
  const [saveImage, setSaveImage] = useState();
  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    const cropped = await getCroppedImg(finalImage, croppedAreaPixels);
    setFinalImage(URL.createObjectURL(cropped));
    setSaveImage(cropped);
    setIsCropping(false);
  };

  const handleSave = () => {
    console.log("final: ", saveImage);
    let fileToSend;
    if (!(saveImage instanceof File)) {
      fileToSend = new File([saveImage], "stadium.jpg", {
        type: saveImage.type || "image/jpeg",
      });
    } else {
      fileToSend = saveImage;
    }

    onSave(fileToSend);
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="md" fullWidth>
      <DialogContent
        sx={{
          position: "relative",
          height: "80vh",
          //   backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
      >
        {isCropping ? (
          <Cropper
            image={
              finalImage instanceof File
                ? URL.createObjectURL(finalImage)
                : finalImage
            }
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        ) : (
          <Box
            component="img"
            src={
              finalImage instanceof File
                ? URL.createObjectURL(finalImage)
                : finalImage
            }
            alt="Preview"
            sx={{ maxHeight: "80vh", maxWidth: "100%", objectFit: "contain" }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
        {isCropping ? (
          <Button variant="contained" color="warning" onClick={handleCrop}>
            Crop
          </Button>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={handleSave}>
              حفظ
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setIsCropping(true)}
            >
              قص
            </Button>
            <Button variant="contained" color="error" onClick={onCancel}>
              إلغاء
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

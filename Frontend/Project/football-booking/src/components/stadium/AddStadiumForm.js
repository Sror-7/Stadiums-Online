import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import { AddNewStadium } from "../../pages/stadiums/AddNewStadium";
import { useDispatch } from "react-redux";
import { addNewStadium } from "../../features/stadium/stadiumThunk";
import { isEmailAvailable } from "../../utils/userHelpers";
import { isStadiumNameAvailable } from "../../utils/stadiumHelpers";
import { useNavigate } from "react-router-dom";

export default function AddStadiumForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerID: 0,
    name: "",
    country: "",
    city: "",
    address: "",
    email: "",
    phoneCode: "+1",
    phone: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false); // ⬅️ حالة التحميل

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = async () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Stadium name is required";
    } else if (!(await isStadiumNameAvailable(formData.name.trim()))) {
      newErrors.name = "Stadium name is already taken";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    } else if (!(await isEmailAvailable(formData.email.trim()))) {
      newErrors.email = "Email is already registered";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{6,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "description are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    addStadium();
  };

  const addStadium = async () => {
    setLoading(true);
    const result = await dispatch(addNewStadium(formData));
    setLoading(false);

    if (addNewStadium.fulfilled.match(result)) {
      setSnackbar({
        open: true,
        message: "✅ Stadium added successfully!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setSnackbar({
        open: true,
        message: "❌ Failed to add stadium",
        severity: "error",
      });
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <div
        style={{
          maxWidth: 800,
          width: "90%",
          margin: "20px auto",
          padding: 16,
        }}
      >
        <Card>
          <CardHeader title="Stadium Information" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Stadium Name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Country"
                    fullWidth
                    margin="normal"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    error={!!errors.country}
                    helperText={errors.country}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="City"
                    fullWidth
                    margin="normal"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
              </Grid>
              <div style={{ marginTop: 16 }}>
                <InputLabel sx={{ mb: 1 }}>Address</InputLabel>
                <TextareaAutosize
                  minRows={3}
                  placeholder="Enter stadium address"
                  style={{ width: "100%", padding: 8, fontSize: 16 }}
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                {errors.address && (
                  <Typography color="error">{errors.address}</Typography>
                )}
              </div>

              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 4, sm: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Code</InputLabel>
                    <Select
                      value={formData.phoneCode}
                      onChange={(e) =>
                        handleChange("phoneCode", e.target.value)
                      }
                      label="Code"
                    >
                      <MenuItem value="+1">+1</MenuItem>
                      <MenuItem value="+20">+20</MenuItem>
                      <MenuItem value="+964">+964</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 8, sm: 10 }}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
              </Grid>

              <div style={{ marginTop: 16 }}>
                <InputLabel sx={{ mb: 1 }}>descriptions</InputLabel>
                <TextareaAutosize
                  minRows={3}
                  placeholder="Enter description"
                  style={{ width: "100%", padding: 8, fontSize: 16 }}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                {errors.notes && (
                  <Typography color="error">{errors.description}</Typography>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 16,
                  marginTop: 24,
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => console.log("Cancelled")}
                  disabled={loading} // ⬅️ نعطل زر الإلغاء أيضاً أثناء التحميل
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading} // ⬅️ نعطل زر الحفظ أثناء التحميل
                  sx={{
                    backgroundColor: "#2e7d32",
                    "&:hover": { backgroundColor: "#27632a" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : (
                    "Save Stadium"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

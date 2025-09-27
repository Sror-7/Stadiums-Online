import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { IsPassowrdCorrect } from "../../features/user/userThunk";
export default function PasswordCard({ onUpdatePassword, onForgotPassword }) {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [openForgot, setOpenForgot] = useState(false);
  const [email, setEmail] = useState("");

  const [errorCurrent, setErrorCurrent] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const handleSave = async () => {
    // Reset errors
    setErrorCurrent("");
    setErrorNew("");
    setErrorConfirm("");

    // Check for empty fields
    if (!current || !newPass || !confirmPass) {
      if (!current) setErrorCurrent("Current password is required");
      if (!newPass) setErrorNew("New password is required");
      if (!confirmPass) setErrorConfirm("Please confirm new password");
      return;
    }

    // Check if new and confirm passwords match
    if (newPass !== confirmPass) {
      setErrorConfirm("New password and confirmation do not match");
      return;
    }

    // Check if current password is correct
    const result = await dispatch(IsPassowrdCorrect({ password: current }));
    if (!result.payload.isCorrect) {
      setErrorCurrent("Current password is incorrect");
      return;
    }

    // All validations passed, call the change password function
    onUpdatePassword({ current, newPassword: newPass });

    // Reset fields
    setCurrent("");
    setNewPass("");
    setConfirmPass("");
  };

  const handleForgot = () => {
    setOpenForgot(true);
  };

  const handleSendReset = () => {
    onForgotPassword(email);
    setOpenForgot(false);
    setEmail("");
  };

  return (
    <>
      <Card sx={{ borderRadius: 3, boxShadow: 2 }} style={{ width: "100%" }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6">Change Password</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box display="grid" gridTemplateColumns="1fr" gap={2}>
            <TextField
              label="Current Password"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              fullWidth
              error={!!errorCurrent}
              helperText={errorCurrent}
            />

            <TextField
              label="New Password"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              fullWidth
              error={!!errorNew}
              helperText={errorNew}
            />

            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              fullWidth
              error={!!errorConfirm}
              helperText={errorConfirm}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link component="button" variant="body2" onClick={handleForgot}>
                Forget Password?
              </Link>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog Forget Password */}
      <Dialog open={openForgot} onClose={() => setOpenForgot(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForgot(false)}>Cancel</Button>
          <Button onClick={handleSendReset} variant="contained">
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

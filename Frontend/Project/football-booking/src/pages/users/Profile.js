import { Container, Grid } from "@mui/material";
import { PersonCard } from "../../components/user/PersonInformationCard";
import { UserCard } from "../../components/user/UserInformationCard";
import { getUserInfoByID } from "../../features/user/userThunk";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PasswordCard from "../../components/user/PasswordCard";
import { ChangeUserPassword } from "../../features/user/userThunk";
import { Snackbar, Alert } from "@mui/material";
export function Profile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  async function LoadUserInfo() {
    const result = await dispatch(getUserInfoByID());
    if (getUserInfoByID.fulfilled.match(result)) {
      setUser(result.payload);
    }
  }
  useEffect(() => {
    LoadUserInfo();
  }, []);
  async function onUpdatePassword({ current, newPassword }) {
    const result = await dispatch(ChangeUserPassword({ current, newPassword }));
    if (result.payload.success) {
      setSnackbar({
        open: true,
        message: "Password changed successfully!",
        severity: "success",
      });
    } else
      setSnackbar({
        open: false,
        message: "Password changed faild!",
        severity: "faild",
      });
  }
  function onForgotPassword() {
    console.log("updated password will start");
  }
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  return (
    <Container>
      {" "}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
      <Grid container spacing={2}>
        {user != null && (
          <>
            {/* PersonCard full width */}
            <Grid size={{ xs: 12 }}>
              <PersonCard personObj={user.person} />
            </Grid>

            {/* UserCard + PasswordCard side by side */}
            <Grid container spacing={2} size={{ xs: 12 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <UserCard userObj={user} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <PasswordCard
                  onUpdatePassword={onUpdatePassword}
                  onForgotPassword={onForgotPassword}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

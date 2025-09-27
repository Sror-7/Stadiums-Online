import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  TextField,
  Link,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../features/user/userThunk";
import { isUserNameAvailable } from "../../utils/userHelpers";
export function UserCard({ userObj, userID }) {
  const dispatch = useDispatch();

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [user, setUser] = useState({
    userid: null,
    username: "",
    email: "",
    personid: null,
  });
  const [updateUser, setUpdateUser] = useState(user);
  async function LoadUserInfo() {
    if (userObj != null && userObj != []) {
      setUser(userObj);
      setUpdateUser(userObj);
    }
  }
  useEffect(() => {
    LoadUserInfo();
  }, []);
  const handleChange = (field, value) => {
    setUpdateUser((prev) => ({ ...prev, [field]: value }));
  };
  const handleSaveUser = async () => {
    const isAvailable = await isUserNameAvailable(
      updateUser.username,
      updateUser.id
    );
    if (!isAvailable) {
      alert("Username is already exist please insert another one.");
      return;
    }

    setIsEditingUser(false);
    setUser((prev) => ({ ...prev, ...updateUser }));
    console.log("save function: ", updateUser);
    const userPayload = {
      id: updateUser.id,
      personid: updateUser.personID,
      username: updateUser.username,
      email: updateUser.email,
    };
    console.log("userPayload", userPayload);
    dispatch(UpdateUser(userPayload));
  };

  return (
    <Grid size={{ xs: 12 }}>
      <Card sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
        <CardContent>
          <Box
            size={{ mt: 4, mb: 1 }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              User Account Info
            </Typography>
            <IconButton onClick={() => setIsEditingUser(!isEditingUser)}>
              <EditIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              {isEditingUser ? (
                <TextField
                  fullWidth
                  label="Username"
                  value={updateUser.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              ) : (
                <>
                  <Typography variant="caption">Username</Typography>
                  <Typography>{user.username}</Typography>
                </>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              {isEditingUser ? (
                <TextField
                  fullWidth
                  label="Email"
                  value={updateUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                <>
                  <Typography variant="caption">Email</Typography>
                  <Typography>{user.email}</Typography>
                </>
              )}
            </Grid>
          </Grid>

          {isEditingUser && (
            <Box>
              <Button
                style={{ marginTop: "30px" }}
                variant="contained"
                onClick={handleSaveUser}
                startIcon={<SaveIcon />}
              >
                Save User Info
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Button,
  TextField,
  Link,
  Divider,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../features/user/userThunk";
import { isUserNameAvailable } from "../../utils/userHelpers";
import { updatePerson } from "../../features/person/personThunk";
import { getUserInfoByID } from "../../features/user/userThunk";
import { useSelector } from "react-redux";
export function ProfileCard({ user, userID }) {
  console.log("hey Sror: ", user);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);

  const [userInformation, setUserInformation] = useState({
    userid: null,
    username: "",
    email: "",
    personid: null,
    person: {
      address: "",
      createdDate: "",
      dateOfBirth: "",
      firstName: "",
      fullName: "",
      gender: "",
      id: -1,
      lastName: "",
      phone: "",
      profilePicture: null,
      secondName: "",
    },
  });
  const [tempUser, setTempUser] = useState(userInformation);
  async function LoadUserInfo() {
    if (user != null && user != []) {
      setUserInformation(user);
    } else {
      const result = await dispatch(getUserInfoByID(userID));
      if (getUserInfoByID.fulfilled.match(result)) {
        console.log("fakk: ", result.payload);
        setUserInformation(result.payload);
      } else {
      }
    }
  }
  useEffect(() => {
    LoadUserInfo();
  }, []);
  const handleChange = (field, value) => {
    setTempUser((prev) => ({ ...prev.person, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
      setTempUser((prev) => ({
        ...prev,
        profilePicture: newImageUrl,
      }));
      setImageFile(file);
    }
  };
  const handleSavePerson = () => {
    setIsEditingPerson(false);
    console.log("davic:", tempUser);
    setUserInformation((prev) => ({ ...prev, ...tempUser }));

    const formData = new FormData();

    formData.append("id", tempUser.person.id);
    formData.append("firstName", tempUser.person.fullName.split(" ")[0] || "");
    formData.append("secondName", tempUser.person.fullName.split(" ")[1] || "");
    formData.append("lastName", tempUser.person.fullName.split(" ")[2] || "");
    formData.append("phone", tempUser.person.phone);
    formData.append("gender", tempUser.person.gender);
    formData.append("address", tempUser.person.address);
    formData.append("dateOfBirth", tempUser.person.dateOfBirth);
    if (imageFile) {
      formData.append("profilePicture", imageFile);
    }

    // dispatch(updatePerson(formData));
  };

  const handleSaveUser = async () => {
    const isAvailable = await isUserNameAvailable(
      tempUser.username,
      tempUser.userid
    );
    if (!isAvailable) {
      alert("Username is already exist please insert another one.");
      return;
    }

    setIsEditingUser(false);
    setUserInformation((prev) => ({ ...prev, ...tempUser }));

    const userPayload = {
      id: tempUser.userid,
      personid: tempUser.personid,
      username: tempUser.username,
      email: tempUser.email,
    };
    dispatch(UpdateUser(userPayload));
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ maxWidth: 750, mx: "auto", p: 3, marginTop: "100px" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Box position="relative">
            <Avatar
              src={
                isEditingPerson && imageUrl
                  ? imageUrl
                  : userInformation.person.profilePicture
              }
              alt={userInformation.person.fullName}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => fileInputRef.current.click()}
              disabled={!isEditingPerson}
            >
              <CameraAltIcon fontSize="small" />
            </IconButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Box>
          <Typography variant="h6" mt={1}>
            {userInformation.person.fullName}
          </Typography>
        </Box>

        <CardContent>
          {/* Section: Person Info */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Personal Information
            </Typography>
            <IconButton onClick={() => setIsEditingPerson(!isEditingPerson)}>
              <EditIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {["fullName", "phone", "gender", "dateOfBirth", "address"].map(
              (field, index) => {
                const labelMap = {
                  fullName: "Full Name",
                  phone: "Phone",
                  gender: "Gender",
                  dateOfBirth: "Date Of Birth",
                  address: "Address",
                };

                const isDate = field === "dateOfBirth";
                const sm = field === "address" ? 12 : 6;

                return (
                  <Grid size={{ xs: 12, sm: sm }} key={field}>
                    {isEditingPerson ? (
                      <TextField
                        fullWidth
                        label={labelMap[field]}
                        type={isDate ? "date" : "text"}
                        value={tempUser.person[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        InputLabelProps={isDate ? { shrink: true } : undefined}
                      />
                    ) : (
                      <>
                        <Typography variant="caption">
                          {labelMap[field]}
                        </Typography>
                        <Typography>{userInformation.person[field]}</Typography>
                      </>
                    )}
                  </Grid>
                );
              }
            )}
          </Grid>

          {isEditingPerson && (
            <Box size={{ mt: 3 }} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleSavePerson}
                startIcon={<SaveIcon />}
                style={{ marginTop: "10px" }}
              >
                Save Personal Info
              </Button>
            </Box>
          )}

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
            {/* Username */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isEditingUser ? (
                <TextField
                  fullWidth
                  label="Username"
                  value={tempUser.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              ) : (
                <>
                  <Typography variant="caption">Username</Typography>
                  <Typography>{userInformation.username}</Typography>
                </>
              )}
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 6 }}>
              {isEditingUser ? (
                <TextField
                  fullWidth
                  label="Email"
                  value={tempUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                <>
                  <Typography variant="caption">Email</Typography>
                  <Typography>{userInformation.email}</Typography>
                </>
              )}
            </Grid>

            {isEditingUser && (
              <Grid size={{ xs: 12 }}>
                <Link href="#" underline="hover">
                  Change Password (via email verification)
                </Link>
              </Grid>
            )}
          </Grid>

          {isEditingUser && (
            <Box size={{ mt: 3 }} display="flex" justifyContent="flex-end">
              <Button
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

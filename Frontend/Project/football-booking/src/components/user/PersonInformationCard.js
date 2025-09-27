import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  TextField,
  Divider,
  MenuItem,
} from "@mui/material";
import { getObjectDiffPatch } from "../../utils/global";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { formatDate } from "../../utils/global";
import { useDispatch } from "react-redux";
import {
  updatePersonImage,
  updatePersonInfo,
} from "../../features/person/personThunk";
import ProfilePicture from "./ProfilePicture";

export function PersonCard({ personObj }) {
  const dispatch = useDispatch();
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const [person, setPerson] = useState({
    personid: null,
    fullName: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    birthDate: "",
    imageURL: "",
  });

  const [updatePerson, setUpdatePerson] = useState(person);

  async function LoadPersonInformation() {
    if (personObj != null) {
      console.log(personObj);
      setPerson(personObj);
    }
  }

  useEffect(() => {
    setUpdatePerson(person);
  }, [person]);

  useEffect(() => {
    LoadPersonInformation();
  }, []);

  const handleChange = (field, value) => {
    setUpdatePerson((prev) => ({ ...prev, [field]: value }));
  };

  function updateProfileImage(file) {
    dispatch(updatePersonImage({ id: person.id, imageFile: file }));
  }

  const handleSavePerson = () => {
    const patchData = getObjectDiffPatch(person, updatePerson);
    dispatch(updatePersonInfo({ id: person.id, patchData }));
    setPerson((prev) => ({ ...prev, ...updatePerson }));
    setIsEditingPerson(false);
  };

  return (
    <Grid size={{ xs: 12 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <ProfilePicture
            imageUrl={personObj.imageURL}
            onUpdate={updateProfileImage}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6">Personal Information</Typography>
            <IconButton onClick={() => setIsEditingPerson(!isEditingPerson)}>
              <EditIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {isEditingPerson ? (
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
              <TextField
                label="Full Name"
                value={updatePerson.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <TextField
                label="Phone"
                value={updatePerson.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <TextField
                label="Address"
                value={updatePerson.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              <TextField
                select
                label="Gender"
                value={updatePerson.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
              <TextField
                type="date"
                label="Birth Date"
                value={formatDate(updatePerson.dateOfBirth)}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Box gridColumn="span 2">
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{ mt: 2 }}
                  onClick={handleSavePerson}
                >
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
              <Typography>
                <b>Name:</b> {person.name}
              </Typography>
              <Typography>
                <b>Phone:</b> {person.phone}
              </Typography>
              <Typography>
                <b>Address:</b> {person.address}
              </Typography>
              <Typography>
                <b>Gender:</b> {person.gender}
              </Typography>
              <Typography>
                <b>Birth Date:</b> {formatDate(person.dateOfBirth)}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

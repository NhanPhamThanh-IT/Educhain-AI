// Importing necessary modules from react library
import React, { useState, useEffect } from "react";

// Import necessary components from Material-UI library
import { Container, Paper, Avatar, TextField, Button, Typography, Box, MenuItem, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const fetchUserData = async () => {
  try {
    return await new Promise((resolve) => setTimeout(() => resolve({
      fullname: "Gia Bao", nickname: "HandsomeGB", email: "handsomeGB@gmail.com", avatar: "https://via.placeholder.com/100",
      gender: "Male", country: "Vietnam", address: "123 Street, City", phone: "123456789"
    }), 100));
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const ProfileSetup = () => {
  const [userData, setUserData] = useState({});
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    savedData ? setUserData(JSON.parse(savedData)) : fetchUserData().then((data) => data && setUserData(data));
    fetch("/src/utils/data.json")
      .then((res) => res.json())
      .then((data) => { setGenders(data.genders); setCountries(data.countries); })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  const handleChange = (field) => (event) => setUserData({ ...userData, [field]: event.target.value });
  const handleSubmit = () => {
    console.log("Submitted data:", userData);
    localStorage.setItem("userProfile", JSON.stringify(userData));
    alert("Profile data saved successfully!");
  };

  if (!userData.fullname) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="xl" sx={{ mt: 20, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Welcome, {userData.fullname}</Typography>
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
          <Avatar src={userData.avatar} sx={{ width: 80, height: 80 }} />
          <Box><Typography variant="h6">{userData.fullname}</Typography><Typography color="gray">{userData.email}</Typography></Box>
        </Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {["fullname", "nickname", "address", "phone"].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField fullWidth label={field.replace(/\b\w/g, c => c.toUpperCase())} variant="outlined" value={userData[field] || ""} onChange={handleChange(field)} />
            </Grid>
          ))}
          {["gender", "country"].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField fullWidth select label={field.charAt(0).toUpperCase() + field.slice(1)} variant="outlined" value={userData[field] || ""} onChange={handleChange(field)}>
                {(field === "gender" ? genders : countries).map((item) => (
                  <MenuItem key={item.name || item} value={item.name || item}>
                    {field === "country" && <img src={`https://flagcdn.com/w40/${item.code}.png`} alt={item.name} style={{ width: 24, height: 16, marginRight: 8 }} />}
                    {item.name || item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={700}>My Email Address</Typography>
          <Box display="flex" alignItems="center" gap={2} sx={{ mt: 1 }}>
            <EmailIcon color="primary" />
            <Box>
              <Typography>{userData.email}</Typography>
              <Typography variant="caption" color="gray">1 month ago</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" sx={{ fontWeight: 700 }}>+ Add Email Address</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileSetup;

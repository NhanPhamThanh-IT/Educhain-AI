import React, { useState, useEffect } from "react";
import { Container, Paper, Box, Button, Typography } from "@mui/material";
import Page from "../components/Page";
import ProfileHeader from "../sections/ProfileSetup/ProfileHeader";
import ProfileForm from "../sections/ProfileSetup/ProfileForm";
import EmailSection from "../sections/ProfileSetup/EmailSection";
import defaultvalue from "../constants/ProfileSetupPage/default"

const getTimeObject = () => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

const fetchUserData = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        fullname: "Gia Bao",
        nickname: "HandsomeGB",
        email: [{ address: "handsomeGB@gmail.com", updatedTime: getTimeObject() }],
        avatar: "https://via.placeholder.com/100",
        gender: "Male",
        country: "Vietnam",
        address: "123 Street, City",
        phone: "123456789",
      });
    }, 100);
  });

const ProfileSetup = () => {
  const [userData, setUserData] = useState({});
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showAllEmails, setShowAllEmails] = useState(false);

  useEffect(() => {
    fetchUserData().then((data) => setUserData(data));
    setGenders(defaultvalue.genders);
    setCountries(defaultvalue.countries);
  }, []);

  const handleChange = (field) => (event) => setUserData({ ...userData, [field]: event.target.value });

  const handleSubmit = () => alert("Profile data saved successfully!");

  const handleAddEmail = () => {
    const emailInput = window.prompt("Enter new email address:");
    if (emailInput) {
      setUserData({
        ...userData,
        email: [...userData.email, { address: emailInput, updatedTime: getTimeObject() }],
      });
    }
  };

  if (!userData.fullname) return <Typography>Loading...</Typography>;

  return (
    <Page title="Profile Setup">
      <Container maxWidth="xl" sx={{ mt: 15, mb: 5 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
          <ProfileHeader userData={userData} />
          <ProfileForm userData={userData} handleChange={handleChange} genders={genders} countries={countries} />
          <EmailSection emails={userData.email} showAllEmails={showAllEmails} toggleShowEmails={() => setShowAllEmails(!showAllEmails)} handleAddEmail={handleAddEmail} />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontWeight: 700 }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </Page>
  );
};

export default ProfileSetup;

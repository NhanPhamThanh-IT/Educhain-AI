import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Box, Button, Typography } from "@mui/material";
import Page from "../components/Page";
import ProfileHeader from "../sections/ProfileSetup/ProfileHeader";
import ProfileForm from "../sections/ProfileSetup/ProfileForm";
import EmailSection from "../sections/ProfileSetup/EmailSection";
import defaultvalue from "../constants/ProfileSetupPage/default";

const API_URL = `${import.meta.env.VITE_MOCK_API_1}userprofile`;

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

const fetchUserData = async () => {
  try {
    const { data } = await axios.get(API_URL);
    console.log(data);
    return data[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const ProfileSetup = () => {
  const [userData, setUserData] = useState({});
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showAllEmails, setShowAllEmails] = useState(false);

  useEffect(() => {
    fetchUserData().then((data) => {
      if (data) {
        setUserData(data);
      }
    });
    setGenders(defaultvalue.genders);
    setCountries(defaultvalue.countries);
  }, []);

  const handleChange = (field) => (event) =>
    setUserData({ ...userData, [field]: event.target.value });

  const handleSubmit = async () => {
    try {
      await axios.put(API_URL, userData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Profile data saved successfully!");
    } catch (error) {
      console.error("Error saving profile data:", error);
      alert("Failed to save profile data");
    }
  };

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
          <EmailSection
            emails={userData.email}
            showAllEmails={showAllEmails}
            toggleShowEmails={() => setShowAllEmails(!showAllEmails)}
            handleAddEmail={handleAddEmail}
          />
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
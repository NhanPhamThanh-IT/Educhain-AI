import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Box, Button, Typography } from "@mui/material";
import Page from "@components/Page";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import defaultvalue from "@constants/ProfileSetupPage/default";
import { getUserProfileApi } from "@utils/api";

const normalizeUserData = (data) => {
  return {
    address: data.address || "",
    country: data.country || "",
    courselist: data.courselist || [],
    created_at: data.created_at || "",
    edutoken: data.edutoken || 0,
    email: data.email ? [{ address: data.email, updatedTime: data.updated_at }] : [],
    fullname: data.fullname || "",
    gender: data.gender || "",
    id: data.id || "",
    learntoken: data.learntoken || 0,
    nickname: data.nickname || "",
    phonenumber: data.phonenumber || "",
    updated_at: data.updated_at || "",
    username: data.username || "",
  };
};

const fetchUserData = async () => {
  try {
    const response = await getUserProfileApi();
    console.log("User data fetched successfully:", response.data);
    return normalizeUserData(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const ProfileSetup = () => {
  const [userData, setUserData] = useState(null);
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);

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
    setUserData((prev) => ({ ...prev, [field]: event.target.value }));

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

  if (!userData) return <Typography>Loading...</Typography>;

  return (
    <Page title="Profile Setup">
      <Container maxWidth="xl" sx={{ mt: 15, mb: 5 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
          <ProfileHeader userData={userData} />
          <ProfileForm userData={userData} handleChange={handleChange} genders={genders} countries={countries} />
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
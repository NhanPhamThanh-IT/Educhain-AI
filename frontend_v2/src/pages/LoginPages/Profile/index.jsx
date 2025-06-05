import { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Paper, Box, Button, Typography, CircularProgress } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import defaultvalue from "./constants.js";
import { getUserProfileApi, updateUserProfileApi } from "@/api/index.js";

// Normalized data function outside component to avoid recreation on each render
const normalizeUserData = (data) => {
  if (!data) return null;

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

const ProfileSetup = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Memoize these values to prevent unnecessary array recreations
  const genders = useMemo(() => defaultvalue.genders, []);
  const countries = useMemo(() => defaultvalue.countries, []);

  // Fetch user data once on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfileApi();

        if (isMounted) {
          setUserData(normalizeUserData(response.data));
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching user data:", err);
          setError("Failed to load profile data");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to handle unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize the change handler to avoid recreation on every render
  const handleChange = useCallback((field) => (event) => {
    const value = event.target.value;
    setUserData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Prepare user data for submission
  const prepareUserDataForSubmission = useCallback((data) => {
    // Format the data according to API requirements
    // This is where you would transform the email from array to string, etc.
    return {
      ...data,
      email: data.email && data.email.length > 0 ? data.email[0].address : '',
      // Add any other transformations needed for the API
    };
  }, []);

  // Memoize the submit handler
  const handleSubmit = useCallback(async () => {
    if (!userData) return;

    try {
      setIsSubmitting(true);

      // Use the dedicated API function for updating profiles
      const preparedData = prepareUserDataForSubmission(userData);
      await updateUserProfileApi(preparedData);

      setError(null);
      alert("Profile data saved successfully!");
    } catch (err) {
      console.error("Error saving profile data:", err);
      setError("Failed to save profile data");
      alert("Failed to save profile data");
    } finally {
      setIsSubmitting(false);
    }
  }, [userData, prepareUserDataForSubmission]);

  // Only render ProfileForm and ProfileHeader once when userData is loaded
  const profileHeader = useMemo(() =>
    userData ? <ProfileHeader userData={userData} /> : null
    , [userData]);

  const profileForm = useMemo(() =>
    userData ? (
      <ProfileForm
        userData={userData}
        handleChange={handleChange}
        genders={genders}
        countries={countries}
      />
    ) : null
    , [userData, handleChange, genders, countries]);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 15 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !userData) {
    return (
      <Container sx={{ mt: 15, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 15, mb: 5 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
        {profileHeader}
        {profileForm}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{ fontWeight: 700 }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileSetup;
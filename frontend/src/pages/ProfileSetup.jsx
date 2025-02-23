import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  TextField,
  MenuItem,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import defaultvalue from "../constants/ProfileSetupPage/default";
import Page from "../components/Page";

// Các hàm trợ giúp chuyển đổi thời gian
const getTimeObjectFromDate = (date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  hour: date.getHours(),
  minute: date.getMinutes(),
  second: date.getSeconds(),
});
const getTimeObject = () => getTimeObjectFromDate(new Date());
const formatTimeObject = (t) => {
  if (!t) return "";
  const pad = (num) => num.toString().padStart(2, "0");
  return `${t.year}-${pad(t.month)}-${pad(t.day)} ${pad(t.hour)}:${pad(t.minute)}:${pad(t.second)}`;
};

// Giả lập fetch dữ liệu người dùng
const fetchUserData = async () =>
  new Promise((resolve) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    setTimeout(() => {
      resolve({
        fullname: "Gia Bao",
        nickname: "HandsomeGB",
        email: [
          { address: "handsomeGB@gmail.com", updatedTime: getTimeObjectFromDate(oneMonthAgo) },
          { address: "example123@gmail.com", updatedTime: getTimeObjectFromDate(threeMonthsAgo) },
          { address: "email3@example.com", updatedTime: getTimeObject() },
          { address: "email4@example.com", updatedTime: getTimeObject() },
          { address: "email5@example.com", updatedTime: getTimeObject() },
          { address: "email6@example.com", updatedTime: getTimeObject() },
          { address: "email7@example.com", updatedTime: getTimeObject() },
          { address: "email8@example.com", updatedTime: getTimeObject() },
        ],
        avatar: "https://via.placeholder.com/100",
        gender: "Male",
        country: "Vietnam",
        address: "123 Street, City",
        phone: "123456789",
      });
    }, 100);
  });

// Component hiển thị phần header (avatar và tên)
const ProfileHeader = ({ userData }) => (
  <Box>
    <Typography variant="h5" gutterBottom fontWeight={700} color="black">
      Welcome, <span style={{ color: "rgba(54, 90, 202, 1)" }}>{userData.fullname}</span>
    </Typography>
    <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
      <Avatar
        src={userData.avatar}
        sx={{ width: 90, height: 90, border: "3px solid rgba(54, 90, 202, 1)" }}
      />
      <Typography variant="h6" fontWeight={600}>
        {userData.fullname}
      </Typography>
    </Box>
  </Box>
);

// Component hiển thị form thông tin cá nhân
const ProfileForm = ({ userData, handleChange, genders, countries }) => (
  <Grid container spacing={2} sx={{ mt: 3 }}>
    {["fullname", "nickname", "address", "phone"].map((field, idx) => (
      <Grid item xs={12} sm={6} key={idx}>
        <TextField
          fullWidth
          label={field.replace(/\b\w/g, (c) => c.toUpperCase())}
          variant="outlined"
          value={userData[field] || ""}
          onChange={handleChange(field)}
        />
      </Grid>
    ))}
    {["gender", "country"].map((field) => (
      <Grid item xs={12} sm={6} key={field}>
        <TextField
          fullWidth
          select
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          variant="outlined"
          value={userData[field] || ""}
          onChange={handleChange(field)}
        >
          {(field === "gender" ? genders : countries).map((item) => (
            <MenuItem key={item.name || item} value={item.name || item}>
              {field === "country" && (
                <img
                  src={`https://flagcdn.com/w40/${item.code}.png`}
                  alt={item.name}
                  style={{ width: 24, height: 16, marginRight: 8 }}
                />
              )}
              {item.name || item}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    ))}
  </Grid>
);

// Component quản lý danh sách email
const EmailSection = ({ emails = [], showAllEmails, toggleShowEmails, handleAddEmail }) => {
  const maxVisibleEmails = 3;
  const visibleEmails = showAllEmails ? emails : emails.slice(0, maxVisibleEmails);
  const remainingEmailsCount = emails.length - maxVisibleEmails;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight={700} color="primary">
        My Email Addresses
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {visibleEmails.map((email, idx) => (
          <Tooltip key={idx} title={`Updated at: ${formatTimeObject(email.updatedTime)}`} arrow>
            <Chip label={email.address} color="primary" />
          </Tooltip>
        ))}
        {!showAllEmails && remainingEmailsCount > 0 && (
          <Chip
            label={`+${remainingEmailsCount} more`}
            onClick={toggleShowEmails}
            clickable
            color="secondary"
          />
        )}
        {showAllEmails && emails.length > maxVisibleEmails && (
          <Chip label="Show Less" onClick={toggleShowEmails} clickable color="secondary" />
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" color="secondary" sx={{ fontWeight: 700 }} onClick={handleAddEmail}>
          + Add Email Address
        </Button>
      </Box>
    </Box>
  );
};

// Component chính
const ProfileSetup = () => {
  const [userData, setUserData] = useState({});
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showAllEmails, setShowAllEmails] = useState(false);

  // Load dữ liệu từ localStorage hoặc fetch nếu không có
  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (!parsedData.email || parsedData.email.length === 0) {
        fetchUserData().then((data) => data && setUserData(data));
      } else {
        setUserData(parsedData);
      }
    } else {
      fetchUserData().then((data) => data && setUserData(data));
    }
    setGenders(defaultvalue.genders);
    setCountries(defaultvalue.countries);
  }, []);

  // Cập nhật localStorage mỗi khi userData thay đổi
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      localStorage.setItem("userProfile", JSON.stringify(userData));
    }
  }, [userData]);

  const handleChange = (field) => (event) =>
    setUserData({ ...userData, [field]: event.target.value });

  const handleSubmit = () => alert("Profile data saved successfully!");

  const handleAddEmail = () => {
    const emailInput = window.prompt("Enter new email address:");
    if (emailInput && emailInput.trim()) {
      const newEmail = { address: emailInput.trim(), updatedTime: getTimeObject() };
      setUserData({
        ...userData,
        email: userData.email ? [...userData.email, newEmail] : [newEmail],
      });
    }
  };

  const toggleShowEmails = () => {
    setShowAllEmails(!showAllEmails);
  };

  if (!userData.fullname) return <Typography>Loading...</Typography>;

  return (
    <Page title="Profile Setup">
      <Container maxWidth="xl" sx={{ mt: 15, mb: 5 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
          <ProfileHeader userData={userData} />
          <ProfileForm
            userData={userData}
            handleChange={handleChange}
            genders={genders}
            countries={countries}
          />
          <EmailSection
            emails={userData.email}
            showAllEmails={showAllEmails}
            toggleShowEmails={toggleShowEmails}
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

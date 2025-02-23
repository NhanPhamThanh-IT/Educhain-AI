import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Box, IconButton, Autocomplete, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AddPhotoAlternate, InsertDriveFile, OndemandVideo } from "@mui/icons-material";
import Page from "../components/Page";

const categories = ["Information Technology", "Computer Science", "Business", "Design", "Marketing"];

const CreateCourse = () => {
  const [courseImages, setCourseImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setCourseImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  return (
    <Page title="Create Course">
      <Box sx={{ maxWidth: "xl", mx: "auto", mt: 15, px: 3, mb: 5 }}>
        <Typography variant="h4" fontWeight={700} color="primary" textAlign="center" gutterBottom>
          ✏️ Create Your Own Course
        </Typography>
        <Typography color="textSecondary" textAlign="center" mb={3}>
          Fill in the details below to create your course and share it with others!
        </Typography>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={500} color="primary">Course Name</Typography>
                <TextField fullWidth placeholder="Name Your Course" variant="outlined" sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={500} color="primary">Categories</Typography>
                <Autocomplete options={categories} renderInput={(params) => <TextField {...params} placeholder="Select a category" sx={{ mt: 1 }} />} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={500} color="primary">Course Introduction</Typography>
                <TextField fullWidth multiline rows={3} placeholder="Introduce your course" sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={500} color="primary">Course Description</Typography>
                <TextField fullWidth multiline rows={3} placeholder="Write something about your course" sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={500} color="primary">Learning Materials</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><InsertDriveFile color="primary" /></ListItemIcon>
                    <ListItemText primary="Slide1_Introduction to Web Design" secondary="PDF" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><OndemandVideo color="primary" /></ListItemIcon>
                    <ListItemText primary="ABI Web Design Fundamentals" secondary="Video" />
                  </ListItem>
                </List>
                <Button variant="contained" sx={{ mt: 2 }}>+ Add file</Button>
                <Typography sx={{ mt: 1, textAlign: "center" }}>Or</Typography>
                <TextField fullWidth sx={{ mt: 1 }} placeholder="+ Paste video link here" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={500} color="primary">Course Image</Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 150, border: "2px dashed #1976d2", mt: 1, borderRadius: 2 }}>
                  <input accept="image/*" type="file" multiple onChange={handleImageUpload} hidden id="image-upload" />
                  <label htmlFor="image-upload">
                    <IconButton component="span">
                      <AddPhotoAlternate fontSize="large" color="primary" />
                    </IconButton>
                  </label>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  {courseImages.map((src, index) => (
                    <img key={index} src={src} alt="Course" width={80} height={50} style={{ border: "1px solid #1976d2" }} sx={{ borderRadius: 5 }} />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth sx={{ mt: 4, py: 1.5, borderRadius: 2, fontSize: "1rem" }}>
                  ➕ Create
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

export default CreateCourse;

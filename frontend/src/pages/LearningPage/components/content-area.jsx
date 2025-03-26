import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import { CardActionArea, Stack } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloudUpload, Link } from "@mui/icons-material";
import { settings, topics } from "../constants";
import { courses, categoryColors } from "../constants-fake-data";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const options = [
  {
    icon: <CloudUpload fontSize="large" color="primary" />,
    color: "#1976d2",
    title: "Upload",
    subtitle: "PDF, PPT, DOC, TXT",
  },
  {
    icon: <Link fontSize="large" color="secondary" />,
    color: "#9c27b0",
    title: "Paste",
    subtitle: "YouTube, Website",
  },
];

const TitleSection = ({ title }) => (
  <Typography variant="h5" fontWeight={700} color="text.primary">
    {title}
  </Typography>
);

const YourCourses = ({ courses }) => {
  const [open, setOpen] = useState(false);
  const slide_courses = courses.slice(0, 15);
  const [displayedCourses, setDisplayedCourses] = useState(slide_courses.slice(0, 3));

  const observer = useRef();
  const lastCourseElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && displayedCourses.length < slide_courses.length) {
          const nextCourses = slide_courses.slice(displayedCourses.length, displayedCourses.length + 3);
          setDisplayedCourses((prev) => [...prev, ...nextCourses]);
        }
      });

      if (node) observer.current.observe(node);
    },
    [displayedCourses, courses]
  );

  return (
    <>
      <TitleSection title={"My learning journey"} />

      <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          padding={2}
          sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
        >
          {displayedCourses.map((item, index) => {
            const isLastElement = index === displayedCourses.length - 1;
            const categoryStyle = categoryColors[item.category] || { border: "#BDBDBD", text: "#424242" };

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                key={item.id}
              >
                <Chip
                  ref={isLastElement ? lastCourseElementRef : null}
                  label={item.title}
                  variant="outlined"
                  sx={{
                    borderColor: categoryStyle.border,
                    color: categoryStyle.text,
                    fontWeight: "bold",
                    width: "100%",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.08)",
                    },
                  }}
                />
              </motion.div>
            );
          })}
        </Stack>
      </Box>

      {courses.length > 15 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ cursor: "pointer", ":hover": { color: "primary.main", textDecoration: "underline" } }}
          onClick={() => setOpen(true)}
        >
          View more
        </Typography>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>
          All Courses
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {courses.map((item) => {
              const categoryStyle = categoryColors[item.category] || { border: "#BDBDBD", text: "#424242" };

              return (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      border: "2px solid #E0E0E0",
                      boxShadow: "none",
                      backgroundColor: "#FFF",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.03)" },
                    }}
                  >
                    {/* Tăng chiều cao của CardMedia */}
                    <CardMedia component="img" height="180" image={item.img} alt={item.title} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Title và Category trên cùng một hàng */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="h6"
                          color="text.primary"
                          fontWeight="bold"
                          sx={{
                            flexGrow: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Chip
                          label={item.category}
                          sx={{
                            backgroundColor: categoryStyle.border,
                            color: "#FFF",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                          }}
                        />
                      </Stack>

                      {/* Mô tả khóa học */}
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {item.description}
                      </Typography>

                      {/* Duration, Level, và View More trên cùng hàng */}
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                        <Chip label={item.duration} color="default" />
                        <Chip label={item.level} color="secondary" />
                        <Box sx={{ flexGrow: 1 }} /> {/* Đẩy nút View More về bên phải */}
                        <Button size="small" color="primary">
                          View More
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
      </Dialog>


      {displayedCourses.length === 0 && (
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 3 }}>
          No courses available
        </Typography>
      )}
    </>
  );
};

const ExploreTopics = () => (
  <>
    <TitleSection title={"Explore more topics"} />
    <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
      <Slider {...settings}>
        {topics.map(({ img, title }, index) => (
          <Box key={index} sx={{ px: 2 }}>
            <Card sx={topicCardStyles}>
              <CardMedia
                component="img"
                height="160"
                image={img}
                alt={title}
                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <CardContent>
                <Typography align="center" fontWeight={600}>
                  {title}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  </>
);

const Content = () => (
  <>
    <Typography variant="h5" fontWeight={700} color="text.primary">
      What do you want to <Box component="span" color="primary.main">learn</Box> now?
    </Typography>

    <Stack
      direction="row"
      justifyContent="center"
      gap={3}
      mb={1}
      flexWrap="wrap"
    >
      {options.map(({ icon, title, subtitle, color }, index) => (
        <Card
          key={title}
          sx={{
            position: "relative",
            transition: "0.3s ease-in-out",
            borderRadius: 3,
            minWidth: 200,
            boxShadow: 3,
            border: `1.75px dashed ${color}`,
            "&:hover": {
              transform: "scale(1.07)",
              boxShadow: 6,
              borderColor: color,
            },
          }}
        >
          {index === 0 && (
            <Chip
              label="Popular"
              sx={{
                position: "absolute",
                backgroundImage: "linear-gradient(45deg, #56ab2f, #a8e063)",
                color: "white",
                width: 500,
                top: 10,
                right: -74,
                transform: "rotate(45deg)",
                fontWeight: "bold",
              }}
            />
          )}

          <CardActionArea sx={{ p: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                size="large"
                aria-label={title}
                color="primary"
                sx={{
                  color: "white",
                  p: 2,
                  mb: 1,
                }}
              >
                {icon}
              </IconButton>
              <Typography variant="h6" fontWeight={700} textAlign="center">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {subtitle}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
    <Divider sx={{color: "black", width: "30%"}}>Or</Divider>
    <Button variant="contained" sx={{ mb: 4 }} onClick={() => window.location.href = "/mylearning/createcourse"}>
      Create course
    </Button>
  </>
);

const ContentArea = ({ sections, selectedSection, selectedHistory }) => {
  const contentData = sections.find(
    (s) => s.key === selectedSection && s.history?.includes(selectedHistory)
  )?.content;

  return (
    <Box
      sx={{
        p: 6,
        flexGrow: 1,
        overflow: "auto",
        bgcolor: "background.default",
        minHeight: "100vh",
        mt: 4,
      }}
    >
      {contentData || (
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Content />
          <YourCourses courses={courses} />
          <ExploreTopics />
        </Box>
      )}
    </Box>
  );
};

const topicCardStyles = {
  bgcolor: "#ffffff",
  borderRadius: 3,
  boxShadow: 3,
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: 5,
  },
};

export default ContentArea;

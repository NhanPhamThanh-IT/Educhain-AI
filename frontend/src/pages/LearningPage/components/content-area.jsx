import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Paper,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { CardActionArea, Stack } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloudUpload, Link } from "@mui/icons-material";
import { settings, topics, courses } from "../constants";
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
  const [displayedCourses, setDisplayedCourses] = useState(
    slide_courses.slice(0, 10)
  );
  const observer = useRef();
  const lastCourseElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          displayedCourses.length < slide_courses.length
        ) {
          // Load more courses
          const nextCourses = slide_courses.slice(
            displayedCourses.length,
            displayedCourses.length + 10
          );
          setDisplayedCourses((prev) => [...prev, ...nextCourses]);
        }
      });

      if (node) observer.current.observe(node);
    },
    [displayedCourses, courses]
  );

  return (
    <>
      <TitleSection title={"Your learning journey"} />

      <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          gap={1.5}
          justifyContent="center"
          padding={2}
        >
          {displayedCourses.map((item, index) => {
            // Check if this is the last element for infinite scroll
            const isLastElement = index === displayedCourses.length - 1;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Chip
                  ref={isLastElement ? lastCourseElementRef : null}
                  key={item.id}
                  label={item.title}
                  variant="outlined"
                  color="primary"
                  sx={{
                    transition: "all 0.3s ease",
                    fontWeight: "bold",
                    "&:hover": {
                      transform: "scale(1.08)",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
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
          sx={{
            mt: 3,
            cursor: "pointer",
            ":hover": {
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
          onClick={() => setOpen(true)}
        >
          View more
        </Typography>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
      >
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
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            gap={1.5}
            justifyContent="center"
            padding={2}
          >
            {courses.map((item) => (
              <Chip
                key={item.id}
                label={item.title}
                variant="outlined"
                color="primary"
                sx={{ fontWeight: "bold" }}
              />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
      {displayedCourses.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ mt: 3 }}
        >
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
      mb={4}
      flexWrap="wrap"
    >
      {options.map(({ icon, title, subtitle, color }) => (
        <Card
        key={title}
        sx={{
          transition: "0.3s ease-in-out",
          borderRadius: 3,
          minWidth: 200,
          boxShadow: 3,
          border: `1.75px dashed ${color}`, // Viền đứt đoạn màu xanh nhạt
          "&:hover": {
            transform: "scale(1.07)",
            boxShadow: 6,
            borderColor: color, // Viền đậm hơn khi hover
          },
        }}
      >
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

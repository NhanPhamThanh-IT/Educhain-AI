import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
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
  Button,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { CardActionArea, Stack } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloudUpload, Link } from "@mui/icons-material";
import { settings, topics } from "../constants";
import { courses, categoryColors } from "../constants-fake-data";
import { motion, AnimatePresence } from "framer-motion";
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
  <Typography
    variant="h5"
    fontWeight={700}
    color="text.primary"
    sx={{
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -8,
        left: 0,
        width: 60,
        height: 4,
        backgroundColor: 'primary.main',
        borderRadius: 2,
      }
    }}
  >
    {title}
  </Typography>
);

const YourCourses = ({ courses }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const slide_courses = courses.slice(0, 5);
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
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            '@media (max-width: 600px)': {
              gridTemplateColumns: "repeat(1, 1fr)",
            }
          }}
        >
          <AnimatePresence>
            {displayedCourses.map((item, index) => {
              const isLastElement = index === displayedCourses.length - 1;
              const categoryStyle = categoryColors[item.category] || { border: "#BDBDBD", text: "#424242" };

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
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
                      height: 48,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[4],
                        backgroundColor: alpha(categoryStyle.border, 0.1),
                      },
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Stack>
      </Box>

      <Typography
        variant="body1"
        color="textSecondary"
        align="center"
        sx={{
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            color: "primary.main",
            transform: "translateY(-2px)",
          }
        }}
        onClick={() => setOpen(true)}
      >
        View more
      </Typography>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: theme.shadows[10],
          }
        }}
      >
        <DialogTitle sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h5" fontWeight="bold">
            All Courses
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "rotate(90deg)",
                backgroundColor: alpha(theme.palette.error.main, 0.1),
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {courses.map((item) => {
              const categoryStyle = categoryColors[item.category] || { border: "#BDBDBD", text: "#424242" };

              return (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "none",
                        boxShadow: theme.shadows[2],
                        backgroundColor: theme.palette.background.paper,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: theme.shadows[8],
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        image={item.img}
                        alt={item.title}
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          }
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
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
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                              }
                            }}
                          />
                        </Stack>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.description}
                        </Typography>

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mt: 2 }}
                        >
                          <Chip
                            label={item.duration}
                            color="default"
                            sx={{
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                              }
                            }}
                          />
                          <Chip
                            label={item.level}
                            color="secondary"
                            sx={{
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                              }
                            }}
                          />
                          <Box sx={{ flexGrow: 1 }} />
                          <Button
                            size="small"
                            color="primary"
                            sx={{
                              textTransform: "none",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "translateX(4px)",
                              }
                            }}
                          >
                            View More
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
      </Dialog>

      {displayedCourses.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{
            mt: 3,
            fontStyle: 'italic',
            opacity: 0.7,
          }}
        >
          No courses available
        </Typography>
      )}
    </>
  );
};

const ExploreTopics = () => {
  const theme = useTheme();

  return (
    <>
      <TitleSection title={"Explore more topics"} />
      <Box sx={{ width: "100%", mx: "auto", overflow: "hidden" }}>
        <Slider {...settings}>
          {topics.map(({ img, title }, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 3,
                    boxShadow: theme.shadows[2],
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[8],
                      "& .MuiCardMedia-root": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={img}
                    alt={title}
                    sx={{
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <CardContent>
                    <Typography
                      align="center"
                      fontWeight={600}
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: theme.palette.primary.main,
                        }
                      }}
                    >
                      {title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

const Content = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="h5"
        fontWeight={700}
        color="text.primary"
        sx={{
          mb: 4,
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 4,
            backgroundColor: 'primary.main',
            borderRadius: 2,
          }
        }}
      >
        What do you want to <Box component="span" color="primary.main">learn</Box> now?
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        gap={3}
        mb={4}
        flexWrap="wrap"
      >
        {options.map(({ icon, title, subtitle, color }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              sx={{
                position: "relative",
                transition: "all 0.3s ease",
                borderRadius: 3,
                minWidth: 200,
                boxShadow: theme.shadows[3],
                border: `1.75px dashed ${color}`,
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[8],
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
                    zIndex: 1,
                  }}
                />
              )}

              <CardActionArea sx={{ p: 2 }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    }
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label={title}
                    color="primary"
                    sx={{
                      color: "white",
                      p: 2,
                      mb: 1,
                      backgroundColor: alpha(color, 0.1),
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha(color, 0.2),
                        transform: "scale(1.1)",
                      }
                    }}
                  >
                    {icon}
                  </IconButton>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    textAlign="center"
                    sx={{
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: color,
                      }
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    {subtitle}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </motion.div>
        ))}
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Divider
          sx={{
            width: "30%",
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              width: 20,
              height: 2,
              backgroundColor: theme.palette.divider,
            },
            '&::before': {
              left: -30,
            },
            '&::after': {
              right: -30,
            }
          }}
        >
          Or
        </Divider>

        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[8],
            }
          }}
          onClick={() => navigate("/learning/createcourse")}
        >
          Create course
        </Button>
      </Box>
    </>
  );
};

const ContentArea = ({ sections, selectedSection, selectedHistory }) => {
  const theme = useTheme();
  const contentData = sections.find(
    (s) => s.key === selectedSection && s.history?.includes(selectedHistory)
  )?.content;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4, md: 6 },
        flexGrow: 1,
        overflow: "auto",
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        mt: 4,
      }}
    >
      <AnimatePresence mode="wait">
        {contentData ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {contentData}
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Content />
              <YourCourses courses={courses} />
              <ExploreTopics />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
};

YourCourses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};

ContentArea.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      history: PropTypes.arrayOf(PropTypes.string),
      content: PropTypes.node,
    })
  ).isRequired,
  selectedSection: PropTypes.string.isRequired,
  selectedHistory: PropTypes.string.isRequired,
};

export default ContentArea;

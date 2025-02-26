import { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Page from "../components/Page";
import { styled } from "@mui/system";
//----------------------------------------------------------------------------------------------------------
const courses = [
  {
    id: 1,
    title: "Applied Software Engineering Fundamentals",
    provider: "IBM",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.6,
    reviews: 45000,
    category: "Computer Science",
  },
  {
    id: 2,
    title: "IBM Full Stack Software Developer",
    provider: "IBM",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.6,
    reviews: 53000,
    category: "Computer Science",
  },
  {
    id: 3,
    title: "IBM DevOps and Software Engineering",
    provider: "IBM",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.6,
    reviews: 57000,
    category: "Information Technology",
  },
  {
    id: 4,
    title: "Introduction to Software Engineering",
    provider: "IBM",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 38000,
    category: "Computer Science",
  },
  {
    id: 5,
    title: "Java Programming and Software Engineering Fundamentals",
    provider: "Duke University",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.8,
    reviews: 60000,
    category: "Computer Science",
  },
  {
    id: 6,
    title: "Software Design and Architecture",
    provider: "University of Alberta",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 49000,
    category: "Software Engineering",
  },
  {
    id: 7,
    title: "Software Design and Architecture",
    provider: "University of Alberta",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 49000,
    category: "Software Engineering",
  },
  {
    id: 8,
    title: "Software Design and Architecture",
    provider: "University of Alberta",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 49000,
    category: "Software Engineering",
  },
  {
    id: 9,
    title: "Software Design and Architecture",
    provider: "University of Alberta",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 49000,
    category: "Software Engineering",
  },
  {
    id: 10,
    title: "Software Design and Architecture",
    provider: "University of Alberta",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 49000,
    category: "Software Engineering",
  },
  {
    id: 11,
    title: "Software Design and Architecture",
    provider: "University of Alberta",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 49000,
    category: "Software Engineering",
  },
  {
    id: 12,
    title: "Software Design and Architecture",
    provider: "University of Alberta",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/653449eb209c5cc24d2935ed5a0f18cd.png?auto=format%2Ccompress&dpr=1&w=1344&h=548&q=30",
    rating: 4.7,
    reviews: 49000,
    category: "Software Engineering",
  },
];

const CourseCard = styled(Card)({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const CardContainer = styled(Grid)({
  display: "flex",
});

export default function AllCourses() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    computerScience: false,
    business: false,
    informationTechnology: false,
    dataScience: false,
    health: false,
    languageLearning: false,
    english: false,
    french: false,
    spanish: false,
  });
  const activeFilters = Object.keys(filters).filter((key) => filters[key]);
  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const appliedFilters = Object.keys(filters).filter((key) => filters[key]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search?.toLowerCase() || "");
    const matchesFilter =
      appliedFilters.length === 0 || appliedFilters.includes(course.category);
    return matchesSearch && matchesFilter;
  });
  const handleDeleteFilter = (filterName) => {
    setFilters({ ...filters, [filterName]: false });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Page title="All Courses" sx={{ mt: 13 }}>
      <Container maxWidth="lg">
        <TextField
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          placeholder="Search courses..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {search && (
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Results for "{search}"
          </Typography>
        )}
        {activeFilters.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {activeFilters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onDelete={() => handleDeleteFilter(filter)}
              />
            ))}
          </Stack>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{ p: 2, mb: 2, border: "1px solid #ccc", borderRadius: 1 }}
            >
              <Typography variant="h6">Filter by Subject</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.computerScience}
                      onChange={handleFilterChange}
                      name="computerScience"
                    />
                  }
                  label="Computer Science"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.business}
                      onChange={handleFilterChange}
                      name="business"
                    />
                  }
                  label="Business"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.informationTechnology}
                      onChange={handleFilterChange}
                      name="informationTechnology"
                    />
                  }
                  label="Information Technology"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.dataScience}
                      onChange={handleFilterChange}
                      name="dataScience"
                    />
                  }
                  label="Data Science"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.health}
                      onChange={handleFilterChange}
                      name="health"
                    />
                  }
                  label="Health"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.languageLearning}
                      onChange={handleFilterChange}
                      name="languageLearning"
                    />
                  }
                  label="Language Learning"
                />
              </FormGroup>
            </Box>
            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
              <Typography variant="h6">Filter by Language</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.english}
                      onChange={handleFilterChange}
                      name="english"
                    />
                  }
                  label="English"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.french}
                      onChange={handleFilterChange}
                      name="french"
                    />
                  }
                  label="French"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.spanish}
                      onChange={handleFilterChange}
                      name="spanish"
                    />
                  }
                  label="Spanish"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {filteredCourses.map((course) => (
                <CardContainer item xs={12} sm={6} md={4} key={course.id}>
                  <CourseCard>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {course.provider}
                      </Typography>
                      <Typography variant="body2">
                        ⭐ {course.rating} ({course.reviews} reviews)
                      </Typography>
                    </CardContent>
                  </CourseCard>
                </CardContainer>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

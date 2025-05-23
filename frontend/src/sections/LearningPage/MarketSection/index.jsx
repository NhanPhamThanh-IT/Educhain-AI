import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const IntroSection = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Discover Courses
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Explore our wide range of courses and find the perfect one for you
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Star color={theme.palette.primary.main} /> Top Rated
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Courses with the highest ratings and reviews
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <ShoppingCart color={theme.palette.primary.main} /> Best Selling
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Most popular courses among our students
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Star color={theme.palette.primary.main} /> New Arrivals
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fresh content added to our course catalog
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const CategorySection = () => {
  const categories = [
    { name: 'Web Development', count: 120 },
    { name: 'Data Science', count: 85 },
    { name: 'Mobile Development', count: 65 },
    { name: 'UI/UX Design', count: 45 },
    { name: 'Business', count: 90 },
    { name: 'Marketing', count: 75 },
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                {category.name}
              </Typography>
              <Typography variant="body2">
                {category.count} Courses
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ListCourses = ({ title, subcontent }) => {
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development",
      instructor: "John Doe",
      price: "29.99",
      rating: 4.8,
      students: 1234,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Jane Smith",
      price: "39.99",
      rating: 4.9,
      students: 2345,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
      category: "Data Science"
    },
    {
      id: 3,
      title: "Cybersecurity Essentials",
      instructor: "Mike Johnson",
      price: "49.99",
      rating: 4.7,
      students: 3456,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
      category: "Security"
    }
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {subcontent}
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} md={4} key={course.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={course.category}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    By {course.instructor}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Star size={16} color="#FFC107" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {course.rating} ({course.students} students)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ${course.price}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart size={16} />}
                      sx={{
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                          backgroundColor: '#388E3C'
                        }
                      }}
                    >
                      Enroll Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ListCourses.propTypes = {
  title: PropTypes.string.isRequired,
  subcontent: PropTypes.string.isRequired
};

const MarketSection = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <IntroSection />
      <CategorySection />
      <ListCourses 
        title="Highly Recommended Courses" 
        subcontent="Edunity Course Student Can Join With Us!" 
      />
      <ListCourses 
        title="Courses For You" 
        subcontent="Course Tailored Just For You!" 
      />
      <ListCourses 
        title="Top Popular Course" 
        subcontent="Course Tailored Just For You!" 
      />
    </Container>
  );
};

export default MarketSection; 
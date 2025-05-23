import { Box, Typography, Grid, Card, CardContent, Button, LinearProgress, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { HiBadgeCheck } from "react-icons/hi";
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const MissionSection = () => {
  const theme = useTheme();
  const missions = [
    {
      id: 1,
      title: "Complete Your First Course",
      description: "Finish any course to earn your first reward",
      points: 100,
      progress: 75,
      completed: false,
      claimed: false,
      icon: <FaTrophy size={24} color={theme.palette.primary.main} />
    },
    {
      id: 2,
      title: "Watch 5 Videos",
      description: "Watch 5 educational videos to earn points",
      points: 50,
      progress: 40,
      completed: false,
      claimed: false,
      icon: <FaMedal size={24} color={theme.palette.primary.main} />
    },
    {
      id: 3,
      title: "Complete a Quiz",
      description: "Take and pass any quiz with 80% or higher",
      points: 75,
      progress: 100,
      completed: true,
      claimed: false,
      icon: <FaStar size={24} color={theme.palette.primary.main} />
    },
    {
      id: 4,
      title: "Share Your Progress",
      description: "Share your learning journey on social media",
      points: 25,
      progress: 0,
      completed: false,
      claimed: false,
      icon: <FaTrophy size={24} color={theme.palette.primary.main} />
    },
    {
      id: 5,
      title: "Join a Study Group",
      description: "Participate in a study group discussion",
      points: 150,
      progress: 50,
      completed: false,
      claimed: false,
      icon: <FaMedal size={24} color={theme.palette.primary.main} />
    },
    {
      id: 6,
      title: "Create Your First Note",
      description: "Create and save your first study note",
      points: 30,
      progress: 100,
      completed: true,
      claimed: true,
      icon: <FaStar size={24} color={theme.palette.primary.main} />
    }
  ];

  const handleClaim = (missionId) => {
    console.log(`Claiming mission ${missionId}`);
    // Add your claim logic here
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Missions & Rewards
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Complete missions to earn rewards and advance your learning journey
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {missions.map((mission, index) => (
          <Grid item xs={12} md={6} key={mission.id}>
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
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {mission.icon}
                      <Typography variant="h6" gutterBottom>
                        {mission.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img src="/ecoin.png" alt="ecoin" width={20} height={20} />
                      <Typography sx={{ fontWeight: "bold" }}>{mission.points}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {mission.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={mission.progress} 
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          backgroundColor: mission.completed ? theme.palette.success.main : theme.palette.primary.main
                        }
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Progress: {mission.progress}%
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {mission.completed && !mission.claimed && (
                      <Button
                        variant="contained"
                        onClick={() => handleClaim(mission.id)}
                        sx={{
                          backgroundColor: theme.palette.success.main,
                          '&:hover': {
                            backgroundColor: theme.palette.success.dark
                          }
                        }}
                      >
                        Claim Reward
                      </Button>
                    )}
                    {mission.claimed && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HiBadgeCheck size={24} color={theme.palette.success.main} />
                        <Typography color="success.main">Claimed</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MissionSection; 
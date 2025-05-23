import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, useTheme, Container, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const LeaderboardSection = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      points: 2500,
      courses: 12,
      completed: 8,
      streak: 15
    },
    {
      id: 2,
      rank: 2,
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      points: 2300,
      courses: 10,
      completed: 7,
      streak: 12
    },
    {
      id: 3,
      rank: 3,
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      points: 2100,
      courses: 9,
      completed: 6,
      streak: 10
    },
    {
      id: 4,
      rank: 4,
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=4",
      points: 1900,
      courses: 8,
      completed: 5,
      streak: 8
    },
    {
      id: 5,
      rank: 5,
      name: "David Brown",
      avatar: "https://i.pravatar.cc/150?img=5",
      points: 1800,
      courses: 7,
      completed: 4,
      streak: 7
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaTrophy size={24} color="#FFD700" />;
      case 2:
        return <FaMedal size={24} color="#C0C0C0" />;
      case 3:
        return <FaAward size={24} color="#CD7F32" />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Leaderboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Top learners based on their achievements and progress
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="leaderboard tabs">
          <Tab label="All Time" />
          <Tab label="This Month" />
          <Tab label="This Week" />
        </Tabs>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Learner</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Courses</TableCell>
                <TableCell align="right">Completed</TableCell>
                <TableCell align="right">Streak</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((learner) => (
                <TableRow
                  key={learner.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
                    '&:hover': { backgroundColor: theme.palette.action.selected }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getRankIcon(learner.rank)}
                      <Typography
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: learner.rank <= 3 ? theme.palette.primary.main : theme.palette.grey[300],
                          color: learner.rank <= 3 ? 'white' : 'inherit',
                          fontWeight: 'bold'
                        }}
                      >
                        {learner.rank}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={learner.avatar} alt={learner.name} />
                      <Typography>{learner.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <img src="/ecoin.png" alt="ecoin" width={20} height={20} />
                      <Typography>{learner.points}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{learner.courses}</TableCell>
                  <TableCell align="right">{learner.completed}</TableCell>
                  <TableCell align="right">
                    <Typography color="primary" fontWeight="bold">
                      {learner.streak} days
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </Container>
  );
};

export default LeaderboardSection; 
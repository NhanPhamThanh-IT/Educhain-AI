import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Person as PersonIcon, Schedule as ScheduleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {

    const navigate = useNavigate();

    const handleEnrollClick = () => {
        navigate("/coursedetails");
    };

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 1, boxShadow: 3, bgcolor: "rgba(244, 245, 248, 1)", border: "rgba(54, 90, 202, 1) 1px dashed" }}>            <Box position="relative" sx={{ paddingX: 2, paddingTop: 2 }}>
            <CardMedia
                component="img"
                height="180"
                image={course.image}
                alt={course.title}
                sx={{ borderRadius: 1 }}
            />
            <Box position="absolute" top={20} left={20} bgcolor="white" px={1} py={0.5} sx={{ borderRadius: 1 }}>
                <Typography variant="subtitle2" color="primary">{course.category}</Typography>
            </Box>
        </Box>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        ⭐⭐⭐⭐⭐
                        <Typography variant="body2">{course.rating}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <Typography variant="body2" color="rgba(76, 76, 77, 1)">{course.price}</Typography>
                        <img src="/Partials/Ecoin.png" alt="Not found" height="30" />
                    </Box>
                </Box>
                <Typography variant="h6" fontWeight={600} mt={1}>{course.title}</Typography>
                <Box display="flex" justifyContent="space-between" mt={1} bgcolor="white" sx={{ padding: 2, borderRadius: 2, marginBottom: 1 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <ScheduleIcon fontSize="small" />
                        <Typography variant="body2">{course.duration}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon fontSize="small" />
                        <Typography variant="body2">{course.students} students</Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Avatar src={course.instructor.avatar} sx={{ border: "rgba(54, 90, 202, 1) solid 2px" }} />
                        <Typography variant="body2">{course.instructor.name}</Typography>
                    </Box>
                    <Button variant="contained" color="primary" sx={{ textTransform: "none" }} onClick={() => handleEnrollClick()}>Enroll →</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CourseCard;

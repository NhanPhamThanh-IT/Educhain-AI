import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { MdShoppingCartCheckout } from "react-icons/md";

const CourseCard = ({ course }) => (
    <Card sx={{
        borderRadius: 3, boxShadow: 2, height: "100%", padding: 2, position: "relative",
        "&::before": {
            content: '""', position: "absolute", inset: 0, borderRadius: "inherit", padding: "2px", background: "linear-gradient(90deg, #D495EC, #7586E4, #D856CD)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude"
        }
    }}>
        <Box sx={{ position: "relative" }}>
            <CardMedia component="img" height="300" image={course.image} alt={course.title} sx={{ borderRadius: 2 }} />
            <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", background: "rgba(0,0,0,0.6)", color: "#fff", p: 1, textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{course.title}</Typography>
            </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1" color="text.secondary" fontWeight="bold">By {course.author}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" color="text.secondary">{course.price}</Typography>
                    <img src="/Partials/Ecoin.png" alt="Coin" height="35" />
                </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "justify" }}>{course.description}</Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 2, border: "1px solid #365ACA", color: "#365ACA", borderRadius: "8px", fontWeight: "bold", textTransform: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 1, transition: "all 0.3s", "&:hover": { backgroundColor: "#365ACA", color: "#fff", borderColor: "#365ACA" } }}>
                <Typography variant="body1">Get it Now</Typography><MdShoppingCartCheckout fontSize={20} />
            </Button>
        </Box>
    </Card>
);

export default CourseCard;
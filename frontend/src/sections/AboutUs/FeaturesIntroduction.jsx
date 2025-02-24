// Desc: Features Introduction component of About Us section

// Importing necessary MUI libraries
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Importing constants
import features from "../../constants/AboutUs/features";

// Features Introduction component
const FeaturesIntroduction = () => {
    return (
        <Grid container spacing={3} justifyContent="center">
            {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
                    <motion.div
                        style={{ width: "100%", display: "flex" }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Card sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2, boxShadow: 3 }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    );
};

// Exporting FeaturesIntroduction component
export default FeaturesIntroduction;
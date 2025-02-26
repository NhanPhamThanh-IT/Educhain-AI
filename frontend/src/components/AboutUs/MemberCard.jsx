// Desc: MemberCard component for AboutUs page
//       This component is used to display information about a team member.
//       It receives a member object as a prop and displays the member's name, role, experience, and image.
//       The member object has the following properties:
//          - name: the name of the team member
//          - role: the role of the team member
//          - experience: a brief description of the team member's experience
//          - image: the URL of the team member's image
//       The component uses Material-UI components such as Avatar, CardContent, Paper, and Typography to display the information.
//       It also uses framer-motion for animations.
//       The cardVariants object defines the animation variants for the card.
//       The MemberCard component is used in the AboutUs page to display information about team members.
//       It is imported and used in the MainContent component of the AboutUs page.
//       The component is wrapped in a motion.div component with initial and whileInView variants to animate the card when it comes into view.
//       The Paper component is used to create a card-like container for the member information.
//       The Avatar component displays the team member's image.
//       The CardContent component contains the team member's name, role, and experience.
//       The Typography components are used to display the text information.
//       The component also includes styles for the card container, avatar, and text elements.
//       When hovering over the card, it scales up and adds a shadow effect.
//       The MemberCard component is a reusable component that can be used to display information about team members in other parts of the application.
//       It provides a consistent and visually appealing way to present team member information.
//       The component can be customized by changing the styles or adding additional information to the member object.
//       Overall, the MemberCard component enhances the user experience by providing a visually engaging way to learn about the team members.

// Importing necessary components from React
import React from "react";

// Importing necessary components from Material-UI
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { Facebook } from "@mui/icons-material";

// Importing necessary components from framer-motion
import { motion } from "framer-motion";

// Defining the MemberCard component
const MemberCard = ({ member }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", perspective: "1200px" }}>
            <motion.div
                initial={{ rotateY: 0 }}
                whileHover={{
                    rotateY: 180,
                    scale: 1.05,
                    transition: { duration: 1, ease: "easeInOut" }
                }}
                style={{
                    position: "relative",
                    width: "250px",
                    height: "325px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Front side */}
                <Paper
                    elevation={6}
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        p: 3,
                        bgcolor: "#1e293b",
                        color: "white",
                        borderRadius: 3,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{ width: 200, height: 200, mb: 2, border: "3px solid #facc15", borderRadius: "50%" }}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#facc15" }}>
                        {member.name}
                    </Typography>
                </Paper>

                {/* Back side */}
                <Paper
                    elevation={6}
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        p: 3,
                        bgcolor: "#1e293b",
                        color: "white",
                        borderRadius: 3,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="body1" sx={{ fontStyle: "italic", color: "#94a3b8", mb: 1 }}>
                        {member.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e2e8f0" }}>
                        {member.experience}
                    </Typography>
                    <IconButton
                        href={member.facebook}
                        target="_blank"
                        sx={{ position: "absolute", bottom: 10, right: 10, color: "#1877f2" }}
                    >
                        <Facebook fontSize="large" />
                    </IconButton>
                </Paper>
            </motion.div>
        </Box>
    );
};

// Exporting the MemberCard component
export default MemberCard;

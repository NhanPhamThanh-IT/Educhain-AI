import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const courses = [
    {
        title: "The Genetic Code and Translation",
        description: "DNA translates to protein sequences.",
        image: "https://framerusercontent.com/images/07ynar7KgnQELytb2X2hYUuOk.png",
    },
    {
        title: "Introduction to the Human Brain",
        description: "MIT 9.13 The Human Brain, Spring 2019",
        image: "https://framerusercontent.com/images/dlMD555iMOnThjSaMBf0SbHf3k.png",
    },
    {
        title: "Cognitive Psychology: An Intro",
        description: "Mind's mechanisms scientifically explored.",
        image: "https://framerusercontent.com/images/2gp3QeCbVIvZsNGI5WaaLsiIV68.png",
    },
];

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4 },
    }),
};

const CourseCard = ({ course }) => {
    const { ref, inView, entry } = useInView({ threshold: 0.2, triggerOnce: false });
    const [key, setKey] = useState(0);

    React.useEffect(() => {
        if (!inView) {
            setKey((prev) => prev + 1); // Reset key để chạy lại animation
        }
    }, [inView]);

    return (
        <motion.div
            ref={ref}
            key={key} // Thay đổi key để re-render khi ra khỏi viewport
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
        >
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <img
                    src={course.image}
                    alt={course.title}
                    style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                />
                <CardContent>
                    {course.title.split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={textVariants}
                            style={{ display: "inline-block", marginRight: "4px" }}
                        >
                            <Typography variant="h6" fontWeight="bold" component="span" sx={{ userSelect: "none" }}>
                                {word}
                            </Typography>
                        </motion.span>
                    ))}
                    <Typography variant="body2" color="text.secondary" sx={{ userSelect: "none" }}>
                        {course.description}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const CoursesList = () => {
    return (
        <Grid container spacing={4} justifyContent="center">
            {courses.map((course, index) => (
                <Grid item key={index}>
                    <CourseCard course={course} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CoursesList;

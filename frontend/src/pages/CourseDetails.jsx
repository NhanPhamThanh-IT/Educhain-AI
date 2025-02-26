// Desc: Course Details Page
// Note: This page is used to display the details of a course. It fetches the course data from a mock API and displays the course details in different sections.

// Import necessary React modules
import React, { useEffect, useState } from "react";

// Import necessary Axios module for making HTTP requests
import axios from "axios";

// Import necessary MUI components for layout and UI elements
import { Container, Grid, Alert } from "@mui/material";

// Import custom components for different sections of the course details page
import Page from "../components/Page";
import BasicInformationsSection from "../sections/CourseDetails/BasicInformations";
import DescriptionSection from "../sections/CourseDetails/Description";
import LearningOutcomesSection from "../sections/CourseDetails/LearningOutcomes";
import LearningMaterialsSection from "../sections/CourseDetails/LearningMaterials";

// Define the CoursePage component
const CoursePage = () => {
    // State to store the fetched course data
    const [courseData, setCourseData] = useState(null);
    // State to handle any potential errors while fetching data
    const [error, setError] = useState(null);

    // useEffect hook to fetch course data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the mock API to retrieve course details
                const response = await axios.get("https://67bf46b9b2320ee050133bbe.mockapi.io/api/educhainAI/coursedetails");
                // Store the first course object from the response data into state
                setCourseData((response.data)[0]);
            } catch (error) {
                // Log the error and update the error state if fetching fails
                console.error("Failed to load data:", error);
                setError("Failed to load course data. Please try again later.");
            }
        };

        fetchData(); // Call the fetch function
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // If there's an error, display an error alert
    if (error) return <Alert severity="error">{error}</Alert>;
    // If course data is not yet loaded, show a loading message
    if (!courseData) return <div>Loading...</div>;

    return (
        // Wrap the entire page inside a reusable Page component with a title
        <Page title="Course Details">
            {/* Main container with a max width and top margin for layout */}
            <Container maxWidth="xl" sx={{ mt: 12 }}>
                {/* Section for displaying basic course information */}
                <BasicInformationsSection
                    name={courseData.name}
                    abstraction={courseData.abstraction}
                    img={courseData.img}
                    author={courseData.author}
                    modifiedDate={courseData.modifiedDate}
                    rating={courseData.rating}
                    level={courseData.level}
                    students={courseData.students}
                    duration={courseData.duration}
                />

                {/* Grid layout to structure course details */}
                <Grid container spacing={4} sx={{ mt: 0.2 }}>
                    {/* Left column: Course description and learning outcomes */}
                    <Grid item xs={12} md={8}>
                        <DescriptionSection
                            introduction={courseData.introduction}
                            requirements={courseData.requirements}
                            description={courseData.description}
                        />
                        <LearningOutcomesSection
                            content={courseData.learningOutcomes}
                            list_images={courseData.list_images}
                        />
                    </Grid>
                    {/* Right column: Learning materials including documents, lessons, quizzes, and videos */}
                    <Grid item xs={12} md={4}>
                        <LearningMaterialsSection
                            list_documents={courseData.list_documents}
                            list_lessons={courseData.list_lessons}
                            list_quizzes={courseData.list_quizzes}
                            list_videos={courseData.list_videos}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default CoursePage;

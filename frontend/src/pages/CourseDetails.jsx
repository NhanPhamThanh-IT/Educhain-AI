// Importing react components
import React from "react";
import { Container, Grid } from "@mui/material";

// Importing CoursePage component
import BasicInformationsSection from "../sections/CourseDetails/BasicInformations";
import DescriptionSection from "../sections/CourseDetails/Description";
import LearningOutcomesSection from "../sections/CourseDetails/LearningOutcomes";
import LearningMaterialsSection from "../sections/CourseDetails/LearningMaterials";

// Import built-in components
import Page from "../components/Page";

const CoursePage = () => (
    <Page title="Course Details">
        <Container maxWidth="xl" sx={{ mt: 12 }}>
            {/* Basic informations */}
            <BasicInformationsSection />

            {/* Advanced incformations */}
            <Grid container spacing={4} sx={{ my: 4 }}>

                {/* Left column */}
                <Grid item xs={12} md={8}>
                    {/* Course Description */}
                    <DescriptionSection />

                    {/* Learning Outcomes */}
                    <LearningOutcomesSection />
                </Grid>

                {/* Right column */}
                <Grid item xs={12} md={4}>

                    {/* Learning Materials */}
                    <LearningMaterialsSection />
                </Grid>

            </Grid>
        </Container>
    </Page>
);

export default CoursePage;
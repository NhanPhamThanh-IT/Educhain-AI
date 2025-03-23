import React from 'react';
import { Box } from '@mui/material';

import TitleSection from "./title-section";
import CourseList from "./courses-list";

const main = () => {
    return (
        <Box maxWidth="xl" p={3} mt={20}>
            <TitleSection />
            <CourseList />
        </Box>
    )
};

export default main;
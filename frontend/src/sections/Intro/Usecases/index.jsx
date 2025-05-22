import { Box } from '@mui/material';

import TitleSection from '@components/ui/TitleSection'
import CourseList from "./courses-list";

const main = () => {
    return (
        <Box maxWidth="xl" p={3} mt={20}>
            <TitleSection
                title="Built for any use case"
                description="Click on a learning content below, and start your learning journey ⤵"
            />
            <CourseList />
        </Box>
    )
};

export default main;
// Importing React and necessary MUI components
import { Container, Box } from '@mui/material';

// Importing built-in components
import Page from '@components/Page';
import TeamIntroduction from './TeamIntroduction';

// Main content of the About Us page
const MainContent = () => (
    <Container maxWidth="xl">

        {/* Team introduction */}
        <TeamIntroduction />

    </Container>
);

// About Us page
export default function AboutUs() {
    return (
        <Page title="About Us">
            <Box sx={{ background: 'transparent', minHeight: '100vh', pt: 10, pb: 8, mt: 8 }}>
                <MainContent />
            </Box>
        </Page>
    );
}

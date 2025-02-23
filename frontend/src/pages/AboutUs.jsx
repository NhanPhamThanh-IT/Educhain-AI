import React from 'react';
import { Container, Grid, Typography, Box, Stack } from '@mui/material';

import Page from '../components/Page';
import LeaderCard from '../components/AboutUs/LeaderCard';
import MemberCard from '../components/AboutUs/MemberCard';

import teamMembers from '../constants/AboutUs/teamMembers';

const SectionTitle = ({ title }) => (
    <Box textAlign="center" sx={{ my: 4 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: '#facc15', textTransform: 'uppercase' }}>
            {title}
        </Typography>
    </Box>
);

const TeamLeader = ({ leader }) => leader ? (
    <Grid item xs={12}>
        <LeaderCard leader={leader} />
    </Grid>
) : null;

const TeamMembers = ({ members }) => (
    <Grid container spacing={3} justifyContent="center">
        {members.map((member, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
                <MemberCard member={member} />
            </Grid>
        ))}
    </Grid>
);

const MainContent = () => (
    <Container maxWidth="xl" sx={{ py: 5, pt: 8 }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h3" fontWeight="bold" sx={{ color: '#facc15', textTransform: 'uppercase' }}>
                About SoftAI
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: '800px', textAlign: 'justify' }}>
                We are a team of third-year and fourth-year students from the University of Science, Vietnam National University, Ho Chi Minh City, majoring in Software Engineering and Artificial Intelligence. Driven by a passion for technology and digital transformation, especially in AI and Web3 development, we aspire to harness our knowledge and energy to pursue this shared ambition with boundless enthusiasm and dedication.
            </Typography>
        </Stack>

        {/* Team Leader */}
        {teamMembers.length > 0 && (
            <>
                <SectionTitle title="Team Leader" />
                <TeamLeader leader={teamMembers[0]} />
            </>
        )}

        {/* Team Members */}
        {teamMembers.length > 1 && (
            <>
                <SectionTitle title="Team Members" />
                <TeamMembers members={teamMembers.slice(1)} />
            </>
        )}
    </Container>
);

export default function AboutUs() {
    return (
        <Page title="About Us">
            <Box sx={{ background: 'white', minHeight: '100vh', py: 8 }}>
                <MainContent />
            </Box>
        </Page>
    );
}

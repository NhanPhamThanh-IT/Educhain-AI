import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/AboutUs/SectionTitle';
import BioDesc from '../../components/AboutUs/BioDesc';
import MemberCard from '../../components/AboutUs/MemberCard';
import teamMembers from '../../constants/AboutUs/teamMembers';
import { fadeIn, fadeInUp, containerVariants } from '../../utils/motionVariants';

const TeamLeader = ({ leader }) => leader ? (
    <Grid item xs={12}>
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
        >
            <MemberCard member={leader} />
        </motion.div>
    </Grid>
) : null;

const TeamMembers = ({ members }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
        <Grid container spacing={3} justifyContent="center">
            {members.map((member, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                    <motion.div variants={fadeInUp}>
                        <MemberCard member={member} />
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    </motion.div>
);

const TeamIntroduction = () => (
    <Box>
        <Stack alignItems="center" textAlign="center">
            <SectionTitle title="About SoftAI" />
            <BioDesc desc="We are a team of third-year and fourth-year students from the University of Science, Vietnam National University, Ho Chi Minh City, majoring in Software Engineering and Artificial Intelligence. Driven by a passion for technology and digital transformation, especially in AI and Web3 development, we aspire to harness our knowledge and energy to pursue this shared ambition with boundless enthusiasm and dedication." />
        </Stack>

        {teamMembers.length > 0 && (
            <>
                <SectionTitle title="Team Leader" />
                <TeamLeader leader={teamMembers[0]} />
            </>
        )}
        {teamMembers.length > 1 && (
            <>
                <SectionTitle title="Team Members" />
                <TeamMembers members={teamMembers.slice(1)} />
            </>
        )}
    </Box>
);

export default TeamIntroduction;

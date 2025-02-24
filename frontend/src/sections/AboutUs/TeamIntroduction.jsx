// Desc: Team Introduction section of About Us page

// Importing necessary react components
import React from 'react';

// Importing necessary MUI components
import { Box, Grid } from '@mui/material';

// Importing necessary framer motion components
import { motion } from 'framer-motion';

// Importing necessary components from the project
import SectionTitle from '../../components/AboutUs/SectionTitle';
import LeaderCard from '../../components/AboutUs/LeaderCard';
import MemberCard from '../../components/AboutUs/MemberCard';
import teamMembers from '../../constants/AboutUs/teamMembers';

// Importing necessary motion variants
import { zoomIn } from '../../utils/motionVariants'

// Team Leader component
const TeamLeader = ({ leader }) => leader ? (
    <Grid item xs={12}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={zoomIn}>
            <LeaderCard leader={leader} />
        </motion.div>
    </Grid>
) : null;

// Team Members component
const TeamMembers = ({ members }) => (
    <Grid container spacing={3} justifyContent="center">
        {members.map((member, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={zoomIn}>
                    <MemberCard member={member} />
                </motion.div>
            </Grid>
        ))}
    </Grid>
);

// Team Introduction component
const TeamIntroduction = () => (
    <Box>
        {/* Team Leader */}
        {teamMembers.length > 0 && (
            <>
                <SectionTitle title="Team Leader" />
                <TeamLeader leader={teamMembers[0]} />
            </>
        )}

        {/* Team Members */}
        {
            teamMembers.length > 1 && (
                <>
                    <SectionTitle title="Team Members" />
                    <TeamMembers members={teamMembers.slice(1)} />
                </>
            )
        }
    </Box>
)

// Exporting TeamIntroduction component
export default TeamIntroduction;
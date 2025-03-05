// components
import Page from "../components/Page";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  Button,
} from "@mui/material";

import LeaderboardHeader from "../sections/LeaderBoard/Header";
import LeaderboardTable from "../sections/LeaderBoard/Table";

const LeaderboardTabs = ({ tab, setTab }) => (
  <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} variant="scrollable" scrollButtons={false}>
    <Tab label="Monthly" />
    <Tab label="Quarterly" />
  </Tabs>
);

export default function LeaderBoard() {
  const [tab, setTab] = useState(0);
  return (
    <Page title="Leader Board" sx={{ mt: 15 }}>
      <LeaderboardHeader />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(to bottom, #e0c3fc, #8ec5fc)", padding: 4 }}>
        <Paper elevation={3} sx={{ width: "90%", maxWidth: "800px", padding: 3, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold">Top Learner</Typography>
          <LeaderboardTabs tab={tab} setTab={setTab} />
          <LeaderboardTable />
          <Button variant="contained" sx={{ mt: 2 }}>More</Button>
        </Paper>
      </Box>
    </Page>
  );
}

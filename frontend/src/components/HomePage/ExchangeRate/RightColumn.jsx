// Importing necessary hooks and components
// Importing necessary icons and images
import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Pagination, Grid, Skeleton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import cryptocurrencies from "../../../constants/HomePage/cryptocurrencies";

// Defining pageVariants, skeletonVariants and transitionSettings
const pageVariants = { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 } };
const skeletonVariants = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const transitionSettings = { duration: 0.5, ease: "easeInOut" };

// Defining CryptoCard, SkeletonCard and SkeletonContainer components
const CustomTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    background: "white",
    color: "black", fontSize: "0.875rem", padding: "10px 14px", borderRadius: "10px",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.25)", backdropFilter: "blur(6px)", transition: "opacity 0.3s ease-in-out, transform 0.2s ease-in-out",
  },
  "& .MuiTooltip-arrow": { color: "rgba(117,134,228,1)" },
}));

const CryptoCard = ({ crypto }) => {
  return (
    <CustomTooltip title={
      <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", mb: 1, width: 250 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Full name</Typography>
            <Typography variant='body1'>{crypto.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Code</Typography>
            <Typography variant='body1'>{crypto.symbol.toUpperCase()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Price</Typography>
            <Typography variant='body1'>{crypto.price}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Change</Typography>
            <Typography variant='body1'>{crypto.change}</Typography>
          </Box>
        </Box>
      </>} arrow placement="top" PopperProps={{ modifiers: [{ name: "preventOverflow", options: { boundary: "window" } }] }}>
      <Card variant="outlined" sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 3, bgcolor: "background.paper", position: "relative", overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "scale(1.03)" }, width: "100%", minHeight: { xs: 120, sm: 130, md: 150 }, "&::before": { content: '""', position: "absolute", inset: 0, borderRadius: "inherit", padding: "2px", background: "linear-gradient(120deg, #D495EC, #7586E4, #D856CD)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "destination-out", opacity: 0.8 } }}>
        <img src={crypto.image} alt={crypto.name} style={{ width: 50, height: 50 }} />
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Typography variant="body1" color="gray">{crypto.symbol.toUpperCase()}</Typography>
        </Box>
        <Box textAlign="right">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">{crypto.price}</Typography>
            <img src="/Partials/Ecoin.png" alt="Ecoin" height="35" />
          </Box>
        </Box>
      </Card>
    </CustomTooltip>
  );
};

const SkeletonCard = () => (
  <Card
    variant="outlined"
    sx={{
      display: "flex", alignItems: "center", p: 2, borderRadius: 3, bgcolor: "background.paper", position: "relative", overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s", width: "100%", minHeight: { xs: 120, sm: 130, md: 150 },
      "&::before": {
        content: '""', position: "absolute", inset: 0, borderRadius: "inherit", padding: "2px", background: "linear-gradient(90deg, #D495EC, #7586E4, #D856CD)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude"
      }
    }}
  >
    <Grid container spacing={2}>
      <Grid item><Skeleton variant="circular" width={40} height={40} /></Grid>
      <Grid item xs><Skeleton variant="text" width="80%" height={30} /><Skeleton variant="text" width="60%" height={20} /></Grid>
      <Grid item><Skeleton variant="text" width={50} height={30} /><Skeleton variant="text" width={30} height={20} /></Grid>
    </Grid>
  </Card>
);

const SkeletonContainer = () => {
  const skeletonItems = Array.from({ length: 4 });
  return (
    <Grid container spacing={2}>
      {skeletonItems.map((_, index) => (
        <Grid item xs={12} sm={12} md={6} key={index}><SkeletonCard /></Grid>
      ))}
    </Grid>
  );
};

const RightColumn = () => {
  const itemsPerPage = 4;
  const totalPages = Math.ceil(cryptocurrencies.length / itemsPerPage);
  const [page, setPage] = useState(1);
  const [phase, setPhase] = useState("page");

  useEffect(() => {
    let timer;
    if (phase === "page") {
      timer = setTimeout(() => { setPhase("loading"); }, 5000);
    } else if (phase === "loading") {
      timer = setTimeout(() => {
        setPage(prev => (prev < totalPages ? prev + 1 : 1));
        setPhase("page");
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [phase, totalPages]);

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = cryptocurrencies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div key="skeleton" variants={skeletonVariants} initial="initial" animate="animate" exit="exit" transition={transitionSettings}>
            <SkeletonContainer />
          </motion.div>
        ) : (
          <motion.div key={page} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transitionSettings}>
            <Grid container spacing={2}>
              {currentItems.map((crypto, index) => (
                <Grid item xs={12} sm={12} md={6} key={crypto.id || index}>
                  <CryptoCard crypto={crypto} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={page} onChange={(e, value) => { setPhase("loading"); setTimeout(() => { setPage(value); setPhase("page"); }, 2000); }} />
      </Box>
    </Box>
  );
};

export default RightColumn;

import React, { useEffect, useState } from 'react';
import { Box, Card, Avatar, Typography, Pagination, Grid, Skeleton } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { motion, AnimatePresence } from "framer-motion";
import cryptocurrencies from "../../../constants/HomePage/cryptocurrencies";

// Các variants cho hiệu ứng chuyển trang
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const skeletonVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const transitionSettings = {
  duration: 0.5,
  ease: "easeInOut",
};

const CryptoCard = ({ crypto }) => (
  <Card
    variant="outlined"
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      borderRadius: 3,
      boxShadow: 2,
      bgcolor: "background.paper",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "scale(1.03)",
        boxShadow: 4,
      },
      width: "100%",
      minHeight: { xs: 140, sm: 150, md: 160 },
    }}
  >
    <Avatar sx={{ bgcolor: "transparent", fontSize: { xs: 20, sm: 24 } }}>
      {crypto.icon}
    </Avatar>
    <Box sx={{ flexGrow: 1, ml: 2 }}>
      <Typography fontWeight="bold" variant="h6">
        {crypto.name}
      </Typography>
      <Typography variant="body2" color="gray">
        {crypto.symbol}
      </Typography>
    </Box>
    <Box textAlign="right">
      <Typography fontWeight="bold" variant="subtitle1">
        {crypto.price}
      </Typography>
      <Typography sx={{ color: crypto.change.startsWith("+") ? green[500] : red[500] }}>
        {crypto.change}
      </Typography>
    </Box>
  </Card>
);

const SkeletonCard = () => (
  <Card
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 3,
      boxShadow: 2,
      width: "100%",
      minHeight: { xs: 140, sm: 150, md: 160 },
    }}
  >
    <Grid container spacing={2}>
      <Grid item>
        <Skeleton variant="circular" width={40} height={40} />
      </Grid>
      <Grid item xs>
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="60%" height={20} />
      </Grid>
      <Grid item>
        <Skeleton variant="text" width={50} height={30} />
        <Skeleton variant="text" width={30} height={20} />
      </Grid>
    </Grid>
  </Card>
);

const SkeletonContainer = () => {
  const skeletonItems = Array.from({ length: 4 });
  return (
    <Grid container spacing={2}>
      {skeletonItems.map((_, index) => (
        <Grid item xs={12} sm={12} md={6} key={index}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  );
};

const RightColumn = () => {
  const itemsPerPage = 4;
  const totalPages = Math.ceil(cryptocurrencies.length / itemsPerPage);

  // "phase" sẽ xác định trạng thái hiển thị:
  // "page": nội dung trang được hiển thị trong 4s
  // "loading": Skeleton Loading được hiển thị trong 2s
  const [page, setPage] = useState(1);
  const [phase, setPhase] = useState("page");

  useEffect(() => {
    let timer;
    if (phase === "page") {
      // Hiển thị nội dung trang trong 4 giây
      timer = setTimeout(() => {
        setPhase("loading");
      }, 4000);
    } else if (phase === "loading") {
      // Hiển thị skeleton trong 2 giây, sau đó cập nhật trang mới và chuyển sang hiển thị trang
      timer = setTimeout(() => {
        setPage(prev => (prev < totalPages ? prev + 1 : 1));
        setPhase("page");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [phase, totalPages]);

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = cryptocurrencies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="skeleton"
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitionSettings}
          >
            <SkeletonContainer />
          </motion.div>
        ) : (
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitionSettings}
          >
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
        {/* Nếu cần, bạn vẫn có thể cho phép người dùng chuyển trang thủ công */}
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(e, value) => {
            // Khi chuyển trang thủ công, chuyển ngay sang trạng thái loading rồi hiển thị trang mới
            setPhase("loading");
            setTimeout(() => {
              setPage(value);
              setPhase("page");
            }, 2000);
          }} 
        />
      </Box>
    </Box>
  );
};

export default RightColumn;

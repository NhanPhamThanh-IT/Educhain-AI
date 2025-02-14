import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function Logo({ disabledLink = false, sx }) {

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img alt="logo" src="" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

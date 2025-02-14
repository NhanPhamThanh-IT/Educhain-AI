import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function Maintenance() {
  return (
    <Page title="Maintenance" sx={{ height: 1 }}>
      <RootStyle>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Website currently under maintenance
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

          <Button variant="contained" size="large" component={RouterLink} to="/">
            Go to Home
          </Button>
        </Container>
      </RootStyle>
    </Page>
  );
}

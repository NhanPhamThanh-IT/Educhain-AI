import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './Header';
import Footer from './Footer';

const UserLayoutA = () => (
  <>
    <Header />
    <Container sx={{ my: 4 }}>
      <Outlet />
    </Container>
    <Footer />
  </>
);

export default UserLayoutA; 
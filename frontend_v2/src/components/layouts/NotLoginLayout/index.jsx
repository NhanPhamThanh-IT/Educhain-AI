import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const UserLayoutA = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default UserLayoutA; 
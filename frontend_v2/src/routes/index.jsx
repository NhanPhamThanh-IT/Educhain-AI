import { Routes, Route } from 'react-router-dom';

import LoginLayout from '@components/layouts/LoginLayout';
import NotLoginLayout from '@components/layouts/NotLoginLayout';

import Home from '@pages/NotLoginPages/Home/index';
import Docs from '@pages/NotLoginPages/Docs';
import About from '@pages/NotLoginPages/About';
import Profile from '@pages/LoginPages/Profile';
import Settings from '@pages/LoginPages/Settings';
import NotFound from '@pages/ErrorPages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<NotLoginLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/about" element={<About />} />
            </Route>

            <Route element={<LoginLayout />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;

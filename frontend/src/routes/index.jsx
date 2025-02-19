import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "authentication",
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "verify", element: <VerifyCode /> },
      ],
    },
    // Main Routes
    {
      path: "*",
      //   element: <LogoOnlyLayout />,
      children: [
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "homepage",
      children: [
        { path: "", element: <HomePage /> },
      ],
    },
    {
      path: "mylearning",
      children: [
        { path: "", element: <MyLearningPage /> },
      ],
    },
    {
      path: "coursesdocs",
      children: [
        { path: "", element: <CoursesDocs /> },
      ],
    },
    {
      path: "coursedetails",
      children: [
        { path: "", element: <CourseDetails /> },
      ]
    },
    {
      path: "learning",
      children: [
        { path: "leaderboard", element: <LeaderBoard /> },
        { path: "mission", element: <MissionPage /> },
        { path: "course", element: <LearningPage /> },
        { path: "exchange", element: <ExchangeCoin /> },
      ],
    },
    {
      path: "profilesetup",
      children: [
        { path: "", element: <ProfileSetup /> },
      ],
    }
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const Register = Loadable(lazy(() => import("../pages/authentication/Register")));
const ForgotPassword = Loadable(lazy(() => import("../pages/authentication/ForgotPassword")));
const VerifyCode = Loadable(lazy(() => import("../pages/authentication/VerifyCode")));

// MAIN
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const AboutUs = Loadable(lazy(() => import("../pages/AboutUs")));
const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));

// HOMEPAGE
const HomePage = Loadable(lazy(() => import("../pages/HomePage")));

// MYLEARNING
const MyLearningPage = Loadable(lazy(() => import("../pages/MyLearningPage")));

// COURSESDOCS
const CoursesDocs = Loadable(lazy(() => import("../pages/CoursesDocs")));

// COURSEDETAILS
const CourseDetails = Loadable(lazy(() => import("../pages/CourseDetails")));

// LEARNING
const LearningPage = Loadable(lazy(() => import("../pages/LearningPage")));
const MissionPage = Loadable(lazy(() => import("../pages/MissionPage")));
const LeaderBoard = Loadable(lazy(() => import("../pages/LeaderBoard")));
const ExchangeCoin = Loadable(lazy(() => import("../pages/ExchangeCoin")));

// PROFILESETUP
const ProfileSetup = Loadable(lazy(() => import("../pages/ProfileSetup")));
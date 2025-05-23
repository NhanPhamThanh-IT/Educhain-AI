import { lazy } from 'react';

// Lazy load large components
export const CreateCourse = lazy(() => import('../pages/CreateCourse'));
export const CourseDetails = lazy(() => import('../pages/CourseDetails'));
export const MyLearningPage = lazy(() => import('../pages/MyLearningPage'));
export const Market = lazy(() => import('../pages/Market'));
export const AllCourses = lazy(() => import('../pages/AllCourses'));
export const HomePage = lazy(() => import('../pages/IntroPages/HomePage'));
export const AboutUs = lazy(() => import('../pages/IntroPages/AboutUs'));
export const DepositAndEarn = lazy(() => import('../pages/IntroPages/DepositAndEarn'));
export const MissionPage = lazy(() => import('../pages/MissionPage'));
export const ExchangeCoin = lazy(() => import('../pages/ExchangeCoin'));
export const ProfileSetup = lazy(() => import('../pages/ProfileSetup'));
export const LearningPage = lazy(() => import('../pages/LearningPage')); 
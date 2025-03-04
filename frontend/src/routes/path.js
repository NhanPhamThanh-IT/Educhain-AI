// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/authentication";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  auth: path(ROOTS_AUTH, ""),
  verify: path(ROOTS_AUTH, "/verify"),
  fotgotPassword: path(ROOTS_AUTH, "/forgot-password"),
};

export const PATH_PAGE = {
  root: "/",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  about: "/about-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",
};

export const HOME_PAGE = {
  root: "/",
  main: path("/", ""),
}

export const MY_LEARNING = {
  root: "/mylearning",
  main: path("/mylearning", ""),
  createCourse: path("/mylearning", "/createcourse"),
}

export const COURSES_DOCS = {
  root: "/coursesdocs",
  main: path("/coursesdocs", ""),
}

export const COURSE_DETAILS = {
  root: "/coursedetails",
  main: path("/coursedetails", ""),
}

export const LEARNING_PAGE = {
  root: "/learning",
  learningPage: path("/learning", "/course"),
  mission: path("/learning", "/mission"),
  leaderboard: path("/learning", "/leaderboard"),
  exchangeCoin: path("/learning", "/exchange"),
}

export const PROFILE_SETUP = {
  root: "/profilesetup",
  main: path("/profilesetup", ""),
}
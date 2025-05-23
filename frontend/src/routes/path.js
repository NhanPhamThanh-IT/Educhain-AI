// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

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
}

export const MARKET = {
  root: "/market",
  main: path("/market", ""),
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
  createCourse: path("/learning", "/createcourse"),
}

export const PROFILE_SETUP = {
  root: "/profilesetup",
  main: path("/profilesetup", ""),
}
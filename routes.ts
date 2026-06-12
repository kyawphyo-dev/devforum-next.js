const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  TAGS: "/tags",
  PROFILE: (id: string) => `/profile/${id}`,
  PROFILE_EDIT: (id: string) => `/profile/${id}/edit`,
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CATEGORIES: "/categories",
  QUESTIONS: "/questions",
  QUESTION_DETAILS: (id: string) => `/questions/${id}`,
  BOOKMARKS: "/bookmarks",
};

export default ROUTES;

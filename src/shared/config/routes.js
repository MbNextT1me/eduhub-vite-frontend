export const publicPaths = {
  root: () => "/",
  login: () => publicPaths.root(),
};

export const privateRoutes = {
  root: () => "/",
};

export const adminPaths = {
  ...privateRoutes,
};

export const studentPaths = {
  ...privateRoutes,
  task: (id) => studentPaths.root() + `tasks/${id ?? ":taskId"}`,
};

export const teacherPaths = {
  ...privateRoutes,
  task: (id) => teacherPaths.root() + `tasks/${id ?? ":taskId"}`,
};

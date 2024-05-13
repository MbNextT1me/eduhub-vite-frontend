export const publicPaths = {
  root: () => "/",
  login: () => publicPaths.root(),
};

export const adminPaths = {
  root: () => "/",
};

export const studentPaths = {
  root: () => "/",
};

export const teacherPaths = {
  root: () => "/",
  task: (id) => teacherPaths.root() + `tasks/${id ?? ":taskId"}`,
};

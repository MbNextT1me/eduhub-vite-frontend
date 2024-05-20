import { useMemo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {
  publicPaths,
  adminPaths,
  teacherPaths,
  studentPaths,
} from "~/shared/config/routes";
import { ROLES } from "~/shared/config/roles";
import { PublicLayout } from "~/shared/ui/layout/PublicLayout";
import { PrivateLayout } from "~/shared/ui/layout/PrivateLayout";
import { sessionModel } from "~/entities/session";
import { LoginPage } from "./login";
import { AdminUsersPage } from "./admin/users";
import { TeacherTasksPage } from "./teacher/tasks";
import { StudentTasksPage } from "./student/tasks";
import { TeacherTaskPage } from "./teacher/task";
import { StudentTaskPage } from "./student/task";

const publicRoutes = [
  {
    path: publicPaths.login(),
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={publicPaths.login()} />,
  },
];

const studentRoutes = [
  {
    path: studentPaths.root(),
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <StudentTasksPage />,
      },
      {
        path: studentPaths.task(),
        element: <StudentTaskPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={studentPaths.root()} />,
  },
];

const teacherRoutes = [
  {
    path: teacherPaths.root(),
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <TeacherTasksPage />,
      },
      {
        path: teacherPaths.task(),
        element: <TeacherTaskPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={teacherPaths.root()} />,
  },
];

const adminRoutes = [
  {
    path: adminPaths.root(),
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <AdminUsersPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={adminPaths.root()} />,
  },
];

export const Pages = () => {
  const { data: user, error, isLoading } = sessionModel.useUser();

  const routes = useMemo(() => {
    if (user?.role === ROLES.admin) {
      return adminRoutes;
    }
    if (user?.role === ROLES.teacher) {
      return teacherRoutes;
    }
    if (user?.role === ROLES.student) {
      return studentRoutes;
    }
    return publicRoutes;
  }, [user]);

  const routing = useRoutes(routes);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return routing;
};

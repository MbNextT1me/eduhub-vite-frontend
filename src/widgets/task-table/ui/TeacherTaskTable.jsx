import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { taskModel } from "~/entities/task";
import { teacherPaths } from "~/shared/config/routes";

export const TeacherTaskTable = () => {
  const { data: tasks, isLoading, error } = taskModel.useTasks();
  const deleteTask = taskModel.useDeleteTask();
  const navigate = useNavigate();

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Date From</TableCell>
            <TableCell align="center">Date To</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              onClick={() => navigate(teacherPaths.task(task.id))}
            >
              <TableCell align="center">{task.id}</TableCell>
              <TableCell align="center">{task.name}</TableCell>
              <TableCell align="center">
                {dayjs(task.dateFrom).format("LL")}
              </TableCell>
              <TableCell align="center">
                {dayjs(task.dateFrom).format("LL")}
              </TableCell>
              <TableCell align="center">
              <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask.mutate(task.id);
                  }}
                >
                <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

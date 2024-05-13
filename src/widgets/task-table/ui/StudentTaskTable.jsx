import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import { taskModel } from "~/entities/task";

export const StudentTaskTable = () => {
  const { data: tasks, isLoading, error } = taskModel.useTasks();

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
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Date From</TableCell>
            <TableCell align="center">Date To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell align="center">{task.name}</TableCell>
              <TableCell align="center">
                {dayjs(task.dateFrom).format("LL")}
              </TableCell>
              <TableCell align="center">
                {dayjs(task.dateFrom).format("LL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { PageShell } from "~/shared/ui/PageShell";
import { taskModel } from "~/entities/task";
import { fileModel } from "~/entities/file";
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
import DeleteIcon from "@mui/icons-material/Delete";

export const TeacherTaskPage = () => {
  const { taskId } = useParams();
  const {
    data: task,
    isLoading: isTaskLoading,
    error: taskError,
  } = taskModel.useTask(taskId);
  const {
    data: files,
    isLoading: isFilesLoading,
    error: filesError,
  } = fileModel.useFiles({ taskId, category: "CLUSTER_TEST" });
  const deleteFile = fileModel.useDeleteFile("CLUSTER_TEST");

  if (isTaskLoading || isFilesLoading) {
    return "Loading...";
  }

  if (taskError || filesError) {
    return `An error has occurred: ${taskError.message} ${filesError.message}`;
  }

  return (
    <PageShell>
      <Typography variant="h6" mb={2}>
        {task.name}
      </Typography>
      <Typography mb={2}>{task.description}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => deleteFile.mutate(file.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageShell>
  );
};

import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageShell } from "~/shared/ui/PageShell";
import { taskModel } from "~/entities/task";
import { fileModel } from "~/entities/file";
import { userModel } from "~/entities/user";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  styled,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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
  } = fileModel.useTaskFiles({ taskId, category: "CLUSTER_TEST" });
  const {
    data: students,
    isLoading: isStudentsLoading,
    error: studentsError,
  } = userModel.useStudents();
  const addFile = fileModel.useAddFile({ taskId, category: "CLUSTER_TEST" });
  const deleteFile = fileModel.useDeleteFile(taskId);
  const downloadFile = fileModel.useDownloadFile();
  const [selectedStudent, setSelectedStudent] = useState(null);

  if (isTaskLoading || isFilesLoading || isStudentsLoading) {
    return "Loading...";
  }

  if (taskError || filesError || studentsError) {
    return `An error has occurred: ${taskError.message} ${filesError.message} ${studentsError.message}`;
  }

  return (
    <>
      {selectedStudent && (
        <StudentFilesModal
          isOpen
          taskId={taskId}
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

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
                  <TableCell
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() =>
                      downloadFile.mutate({
                        output: file.name,
                        fileId: file.id,
                      })
                    }
                  >
                    {file.name}
                  </TableCell>
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
        <Box my={2}>
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<FileUploadIcon />}
            onChange={(event) => {
              const file = event.target.files[0];
              addFile.mutate(file);
            }}
          >
            Add file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                >
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.surname}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PageShell>
    </>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StudentFilesModal = ({ taskId, student, isOpen, onClose }) => {
  const {
    data: files,
    isLoading: isFilesLoading,
    error: filesError,
  } = fileModel.useTaskFilesByEmail({ taskId, email: student.email });

  if (isFilesLoading) {
    return "Loading...";
  }

  if (filesError) {
    return `An error has occurred: ${filesError.message}`;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Student files</DialogTitle>
      <DialogContent>
        <Stack gap={2} direction="row">
          {files.map((file) => (
            <FileView key={file.id} {...file} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const FileView = ({ id, name }) => {
  const downloadFile = fileModel.useDownloadFile();

  return (
    <Stack
      gap={1}
      alignItems="center"
      sx={{ cursor: "pointer" }}
      onClick={() => downloadFile.mutate({ output: name, fileId: id })}
    >
      <InsertDriveFileIcon />
      <Typography variant="caption">{name}</Typography>
    </Stack>
  );
};

import { useParams } from "react-router-dom";
import { PageShell } from "~/shared/ui/PageShell";
import { taskModel } from "~/entities/task";
import { fileModel } from "~/entities/file";
import { sessionModel } from "~/entities/session";
import { Typography, Button, styled, Stack } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SendIcon from "@mui/icons-material/Send";

export const StudentTaskPage = () => {
  const user = sessionModel.getUserCache();
  const { taskId } = useParams();
  const {
    data: task,
    isLoading: isTaskLoading,
    error: taskError,
  } = taskModel.useTask(taskId);
  const {
    data: taskFiles,
    isLoading: isTaskFilesLoading,
    error: taskFilesError,
  } = fileModel.useTaskFiles({ taskId, category: "CLUSTER_TEST" });
  const {
    data: clusterFiles,
    isLoading: isClusterFilesLoading,
    error: clusterFilesError,
  } = fileModel.useTaskFilesByEmail({ taskId, email: user.username });
  const sendFileToCluster = fileModel.useSendFileToCluster({
    taskId,
    email: user.username,
  });

  if (isTaskLoading || isTaskFilesLoading || isClusterFilesLoading) {
    return "Loading...";
  }

  if (taskError || taskFilesError || clusterFilesError) {
    return `An error has occurred: ${taskError.message} ${taskFilesError.message} ${clusterFilesError.message}`;
  }

  return (
    <PageShell>
      <Typography variant="h6" mb={2}>
        {task.name}
      </Typography>
      <Typography mb={2}>{task.description}</Typography>
      <Typography variant="h6" mb={2}>
        Task files
      </Typography>
      <Stack gap={2} direction="row">
        {taskFiles.map((file) => (
          <FileView key={file.id} {...file} />
        ))}
      </Stack>
      <Typography variant="h6" mb={2}>
        Cluster files
      </Typography>
      <Stack gap={2} direction="row" mb={2}>
        {clusterFiles.map((file) => (
          <FileView key={file.id} {...file} />
        ))}
      </Stack>
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<SendIcon />}
        onChange={(event) => {
          const file = event.target.files[0];
          sendFileToCluster.mutate(file);
        }}
      >
        Send file
        <VisuallyHiddenInput type="file" />
      </Button>
    </PageShell>
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

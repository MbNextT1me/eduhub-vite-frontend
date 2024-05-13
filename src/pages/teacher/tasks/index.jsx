import { Box, Button } from "@mui/material";
import { TeacherTaskTable } from "~/widgets/task-table";
import { PageShell } from "~/shared/ui/PageShell";
import { CreateTaskModal } from "~/features/create-task";
import { useDisclosure } from "~/shared/lib/react";

export const TeacherTasksPage = () => {
  const [isModalOpen, modalHandlers] = useDisclosure();

  return (
    <>
      <CreateTaskModal open={isModalOpen} onClose={modalHandlers.close} />

      <PageShell>
        <Box mb={2}>
          <Button variant="contained" size="large" onClick={modalHandlers.open}>
            Create task
          </Button>
        </Box>
        <TeacherTaskTable />
      </PageShell>
    </>
  );
};

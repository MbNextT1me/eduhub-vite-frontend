import { Box, Button } from "@mui/material";
import { UserTable } from "~/widgets/user-table";
import { CreateUserModal } from "~/features/create-user";
import { PageShell } from "~/shared/ui/PageShell";
import { useDisclosure } from "~/shared/lib/react";

export const AdminUsersPage = () => {
  const [isModalOpen, modalHandlers] = useDisclosure();

  return (
    <>
      <CreateUserModal open={isModalOpen} onClose={modalHandlers.close} />

      <PageShell>
        <Box mb={2}>
          <Button variant="contained" size="large" onClick={modalHandlers.open}>
            Create user
          </Button>
        </Box>
        <UserTable />
      </PageShell>
    </>
  );
};

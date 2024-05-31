import { Box, Button } from "@mui/material";
import { UserTable } from "~/widgets/user-table";
import { ClusterTable } from "~/widgets/cluster-table";
import { CreateUserModal } from "~/features/create-user";
import { CreateClusterModal } from "~/features/create-cluster";
import { PageShell } from "~/shared/ui/PageShell";
import { useDisclosure } from "~/shared/lib/react";

export const AdminUsersPage = () => {
  const [isUserModalOpen, userModalHandlers] = useDisclosure();
  const [isClusterModalOpen, clusterModalHandlers] = useDisclosure();

  return (
    <>
      <CreateUserModal isOpen={isUserModalOpen} onClose={userModalHandlers.close} />
      <CreateClusterModal isOpen={isClusterModalOpen} onClose={clusterModalHandlers.close} />

      <PageShell>
        <Box mb={2}>
          <Button variant="contained" size="large" onClick={userModalHandlers.open}>
            Create user
          </Button>
        </Box>
        <UserTable />
        <Box mb={2}> 
        <Button variant="contained" size="large" onClick={clusterModalHandlers.open}>
            Create cluster
          </Button>
        </Box>
        <ClusterTable />
      </PageShell>
    </>
  );
};

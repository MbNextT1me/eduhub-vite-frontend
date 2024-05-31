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
  import { clusterModel } from "~/entities/cluster";
  
  export const ClusterTable = () => {
    const { data: clusters, isLoading, error } = clusterModel.useClusters();
    const deleteCluster = clusterModel.useDeleteCluster();
  
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
              <TableCell align="center">Host Name</TableCell>
              <TableCell align="center">Port</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Is Active</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {clusters.map((cluster) => (
              <TableRow key={cluster.id}>
                <TableCell align="center">{cluster.id}</TableCell>
                <TableCell align="center">{cluster.name}</TableCell>
                <TableCell align="center">{cluster.host_name}</TableCell>
                <TableCell align="center">{cluster.port}</TableCell>
                <TableCell align="center">{cluster.host_user_name}</TableCell>
                <TableCell align="center">{cluster.is_used_as_active ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => deleteCluster.mutate(cluster.id)}
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
  
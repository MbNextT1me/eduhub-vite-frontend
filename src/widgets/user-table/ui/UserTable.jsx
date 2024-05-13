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
import { userModel } from "~/entities/user";

export const UserTable = () => {
  const { data: users, isLoading, error } = userModel.useUsers();
  const deleteUser = userModel.useDeleteUser();

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
            <TableCell align="center">Surname</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.id}</TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.surname}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => deleteUser.mutate(user.id)}
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

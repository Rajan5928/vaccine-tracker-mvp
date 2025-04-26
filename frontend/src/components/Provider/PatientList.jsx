import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

function createData(name, email) {
  return { name, email };
}

const rows = [
  createData("Sankerdas", "sanker@gmail.com"),
  createData("Kirthi", "kirthi833@gmail.com"),
];

export default function PatientList() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom color="black">
          Patient List
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    navigate("/provider/patient-details");
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

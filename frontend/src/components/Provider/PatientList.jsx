import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

function createData(name, age, gender, email, status, allergies) {
  return { name, age, email, gender, status, allergies };
}

const rows = [
  createData('Sundaram', 28, 'M', 'sundar833@gmail.com', 'new', 'none'),
  createData('Kirthi', 23, 'M', 'kirthi833@gmail.com', 'existing', 'skin'),
  createData('Harsh', 16, 'M', 'harsh833@gmail.com', 'new', 'none'),
  createData('Payal', 40, 'F', 'payal833@gmail.com', 'existing', 'rashes'),
  createData('Ashok', 35, 'M', 'ashok833@gmail.com', 'new', 'none'),
];

export default function PatientList() {
    const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Allergies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=> {useNavigate('/patient/profile')}}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.allergies}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

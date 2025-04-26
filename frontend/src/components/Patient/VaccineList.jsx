import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import axios from '../../utils/api';
import Navbar from '../shared/navbar';

const VaccineList = () => {
  const [vaccines, setVaccines] = useState([
    {
      "name": "Covaxin",
      "dose1": "completed",
      "dose1Date": "2023-06-15T10:00:00Z",
      "dose2": "scheduled",
      "dose2Date": "2023-07-20T10:00:00Z",
      "dose3": "overdue",
      "dose3Date": "2023-08-15T10:00:00Z"
    },
    {
      "name": "HepB",
      "dose1": "completed",
      "dose1Date": "2023-05-10T10:00:00Z",
      "dose2": "completed",
      "dose2Date": "2023-06-12T10:00:00Z",
      "dose3": "scheduled",
      "dose3Date": "2023-07-25T10:00:00Z"
    },
    {
      "name": "DTaP",
      "dose1": "pending",
      "dose1Date": null,
      "dose2": "scheduled",
      "dose2Date": "2023-07-10T10:00:00Z",
      "dose3": "completed",
      "dose3Date": "2023-08-05T10:00:00Z"
    }
  ]
  
  );
  const [loading, setLoading] = useState(true);

  // Fetch vaccine status data
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get('/patient/vaccines');
        setVaccines(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch vaccine data:', error);
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case 'completed':
        return <Chip label="Completed" color="success" />;
      case 'scheduled':
        return <Chip label="Scheduled" color="primary" />;
      case 'overdue':
        return <Chip label="Overdue" color="error" />;
      case 'pending':
        return <Chip label="Pending" color="warning" />;
      default:
        return <Chip label="Unknown" />;
    }
  };

  const renderDate = (date) => {
    if (!date) return 'N/A';
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Navbar/>
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom color='black'>
        Vaccination Schedule & Status
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>Vaccine</strong></TableCell>
              <TableCell align="center">Dose 1</TableCell>
              <TableCell align="center">Dose 2</TableCell>
              <TableCell align="center">Dose 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccines.map((vaccine) => (
              <TableRow key={vaccine.name}>
                <TableCell>{vaccine.name}</TableCell>
                <TableCell align="center">
                  {renderStatus(vaccine.dose1)} <br />
                  {renderDate(vaccine.dose1Date)}
                </TableCell>
                <TableCell align="center">
                  {renderStatus(vaccine.dose2)} <br />
                  {renderDate(vaccine.dose2Date)}
                </TableCell>
                <TableCell align="center">
                  {renderStatus(vaccine.dose3)} <br />
                  {renderDate(vaccine.dose3Date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
};

export default VaccineList;

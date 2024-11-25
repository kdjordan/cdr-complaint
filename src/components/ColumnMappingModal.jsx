import React, { useState } from 'react';
import { addComplaints } from '../utils/db';
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ColumnMappingModal = ({ open, columns, onClose, onSave, csvData }) => {
  const [mappings, setMappings] = useState({});

  const handleSave = () => {
    const selectedData = csvData.map(row => {
      const entry = {};
      for (const [key, value] of Object.entries(mappings)) {
        if (value && row[key] !== undefined) {
          entry[value] = row[key];
        }
      }
      console.log('Entry:', entry);
      return entry;
    });
    
    addComplaints(selectedData)
      .then(() => console.log('Data stored in IndexedDB'))
      .catch(error => console.error('Error storing data:', error));
    onClose();
  };

  const options = ['Originating', 'Dialed', 'Date'];

  // console.log('Modal CSV Data:', csvData);
  // console.log('Modal Columns:', columns);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Map CSV Columns
        </Typography>

        {csvData && csvData.length > 0 && (
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      <Select
                        value={mappings[column] || ''}
                        onChange={(e) => setMappings({
                          ...mappings,
                          [column]: e.target.value
                        })}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.slice(0, 5).map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Mappings
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ColumnMappingModal; 
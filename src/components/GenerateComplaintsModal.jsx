import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const GenerateComplaintsModal = ({ open, onClose, onGenerate }) => {
  const [count, setCount] = useState(1);
  const [reason, setReason] = useState('');

  const handleGenerate = () => {
    onGenerate(count, reason);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Generate Complaints
        </Typography>
        <TextField
          label="Number of Complaints"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleGenerate}>
          Generate
        </Button>
      </Box>
    </Modal>
  );
};

export default GenerateComplaintsModal;

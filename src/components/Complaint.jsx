import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { deleteComplaint } from '../utils/db';

const Complaint = ({ complaint, onDelete }) => {
  const handleCopy = () => {
    const complaintText = `
      Hello Team -

      We need to open a ticket concerning the following call:

      Originating Number: ${complaint.Originating || ''}
      Terminating Number: ${complaint.Dialed || ''}
      Date and Time: ${complaint.Date || ''}
      Reason: ${complaint.Reason || ''}

      Thanks for your attention to this matter.

      Regards,
    `;
    navigator.clipboard.writeText(complaintText)
      .then(() => console.log('Copied to clipboard'))
      .catch(err => console.error('Failed to copy:', err));
  };

  const handleDelete = async () => {
    await deleteComplaint(complaint.id);
    console.log('Complaint deleted');
    onDelete(complaint.id);
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Complaint Details
      </Typography>
      <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {`
          Hello Team -

          We need to open a ticket concerning the following call:

          Originating Number: ${complaint.Originating || ''}
          Terminating Number: ${complaint.Dialed || ''}
          Date and Time: ${complaint.Date || ''}
          Reason: ${complaint.Reason || ''}

          Thanks for your attention to this matter.

          Regards,
        `}
      </Box>
      <Button variant="contained" onClick={handleCopy} sx={{ mt: 1, mr: 1 }}>
        Copy to Clipboard
      </Button>
      <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 1 }}>
        Delete
      </Button>
    </Box>
  );
};

export default Complaint;

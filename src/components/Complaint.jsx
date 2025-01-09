import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { deleteComplaint } from '../utils/db';

const generateComplaintText = (complaints) => {
  if (complaints.length === 0) return 'No complaints available.';

  const openingText = `Hello Team -\n\nWe need to open a ticket concerning the following calls:\n\n`;
  const closingText = `\n\nThanks for your attention to this matter.\n\nRegards,`;

  const complaintDetails = complaints.map((complaint, index) => {
    return `Call example ${index + 1}:\nOriginating Number: ${complaint.Originating || 'N/A'}\nTerminating Number: ${complaint.Dialed || 'N/A'}\nDate and Time: ${complaint.Date || 'N/A'}\nReason: ${complaint.Reason || 'N/A'}\n\n`;
  }).join('');

  return `${openingText}${complaintDetails}${closingText}`;
};

const Complaint = ({ complaints = [], onDelete }) => {
  const [fullText, setFullText] = useState('');

  useEffect(() => {
    console.log('Complaints:', complaints);
    setFullText(generateComplaintText(complaints));
    console.log('Generated Complaint Text:', generateComplaintText(complaints));
  }, [complaints]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText)
      .then(() => console.log('Copied to clipboard'))
      .catch(err => console.error('Failed to copy:', err));
  };

  const handleDelete = async () => {
    for (const complaint of complaints) {
      await deleteComplaint(complaint.id);
      onDelete(complaint.id);
    }
    console.log('Complaints deleted');
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Complaint Details
      </Typography>
      <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {complaints.length > 0 ? fullText : 'No complaints available.'}
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

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';
import Papa from 'papaparse';

const CSVUploader = ({ onUpload }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log('Parsed Data:', results.data);
          onUpload(results.data);
        },
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        mb: 2,
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="body1">Drop the files here ...</Typography>
      ) : (
        <Typography variant="body1">Drag 'n' drop a CSV file here, or click to select one</Typography>
      )}
      <Button variant="contained" sx={{ mt: 2 }}>
        Upload CSV
      </Button>
    </Box>
  );
};

export default CSVUploader; 
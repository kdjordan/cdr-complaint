import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CSVUploader from './components/CSVUploader';
import ColumnMappingModal from './components/ColumnMappingModal';
import GenerateComplaintsModal from './components/GenerateComplaintsModal';
import Complaint from './components/Complaint';
import { initDB, getAllComplaints, deleteAllComplaints } from './utils/db';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    initDB();
  }, []);

  const handleCSVUpload = (data) => {
    if (data.length > 0) {
      const columnNames = Object.keys(data[0]);
      setCsvData(data);
      setColumns(columnNames);
      setIsModalOpen(true);
    }
  };

  const handleDeleteAllComplaints = async () => {
    await deleteAllComplaints();
    console.log('All complaints deleted');
  };

  const handleGenerateComplaints = async () => {
    const complaints = await getAllComplaints();
    if (complaints.length > 0) {
      setComplaints(complaints);
      setIsGenerateModalOpen(true);
    } else {
      console.log('No data available to generate complaints');
    }
  };

  const generateComplaints = (count) => {
    const selectedComplaints = complaints.slice(0, count);
    selectedComplaints.forEach(complaint => {
      // Logic to handle each complaint
      console.log('Generated Complaint:', complaint);
    });
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        CSV Complaint Generator
      </Typography>
      
      <CSVUploader onUpload={handleCSVUpload} />
      
      <ColumnMappingModal
        open={isModalOpen}
        columns={columns}
        csvData={csvData}
        onClose={() => setIsModalOpen(false)}
      />

      <Button variant="contained" color="secondary" onClick={handleDeleteAllComplaints} sx={{ mt: 2 }}>
        Delete All Complaints
      </Button>

      <Button variant="contained" color="primary" onClick={handleGenerateComplaints} sx={{ mt: 2 }}>
        Generate Complaints
      </Button>

      <GenerateComplaintsModal
        open={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={generateComplaints}
      />

      {complaints.map((complaint, index) => (
        <Complaint key={index} complaint={complaint} />
      ))}
    </Container>
  );
}

export default App; 
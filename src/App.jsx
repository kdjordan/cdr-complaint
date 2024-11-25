import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CSVUploader from './components/CSVUploader';
import ColumnMappingModal from './components/ColumnMappingModal';
import GenerateComplaintsModal from './components/GenerateComplaintsModal';
import Complaint from './components/Complaint';
import { initDB, getAllComplaints, deleteAllComplaints, deleteAllDatabases } from './utils/db';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);

  useEffect(() => {
    initDB();

    const handleBeforeUnload = () => {
      deleteAllDatabases();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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
      setAllComplaints(complaints);
      setIsGenerateModalOpen(true);
    } else {
      console.log('No data available to generate complaints');
    }
  };

  const generateComplaints = (count) => {
    const selectedComplaints = allComplaints.slice(0, count);
    setComplaints(selectedComplaints);
    console.log('Generated Complaints:', selectedComplaints);
  };

  const handleDeleteComplaint = (id) => {
    setComplaints(prevComplaints => prevComplaints.filter(c => c.id !== id));
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
        <Complaint key={index} complaint={complaint} onDelete={handleDeleteComplaint} />
      ))}
    </Container>
  );
}

export default App; 
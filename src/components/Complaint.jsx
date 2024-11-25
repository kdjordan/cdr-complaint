import React from 'react';

const Complaint = ({ complaint }) => {
  return (
    <div>
      <h3>Complaint Details</h3>
      <pre>{JSON.stringify(complaint, null, 2)}</pre>
    </div>
  );
};

export default Complaint;

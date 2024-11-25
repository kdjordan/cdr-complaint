# CDR Complaint Generator

This is a React application meant to be run locally.

This application allows a user to upload a CDR and create as many complaints as they want.

Here's how it works:
1. Upload a CSV file and see a preview of the data.
2. Select the columns that correspond to the complaint fields : Originating Number, Dialed Number, Seizure Date.
3. This loads the CSV data into IndexDb in the browser with normalized data.
4. When you click the "Generate Complaints" button, you will get a formatted email body that you can copy and paste into your email client.
5. Send the email to the appropriate party.
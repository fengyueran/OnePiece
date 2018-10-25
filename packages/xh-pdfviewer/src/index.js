import React from 'react';
import ReactDOM from 'react-dom';
import PDFViewer from './PDFViewer';

const App = () => (
  <div style={{ width: 675, height: 800, margin: 10 }}>
    <PDFViewer pdfPath="http://localhost:9090/CuraUploader.pdf" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
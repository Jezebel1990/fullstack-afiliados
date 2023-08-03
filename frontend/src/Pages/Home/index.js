import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FileUploaderContainer,
  UploadInput,
  NavbarContainer,
  Brand,
  LogoutButton,
  Table,
  TableHeader,
  TableData,
} from './styles';


const Home = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setData(reader.result.split('\n'));
      };
      reader.onerror = () => {
        console.error('Error reading the file');
      };
    }
  };

  return (
    <>
      <NavbarContainer>
        <Brand>Uploads</Brand>
        <NavLink to="/login">
        <LogoutButton>Logout</LogoutButton>
        </NavLink>
      </NavbarContainer>
      <FileUploaderContainer>
        <UploadInput type="file" onChange={handleInputChange} />
        <button onClick={handleUpload}>Upload</button>
      </FileUploaderContainer>

      {data.length > 0 && (
        <Table>
          <thead>
            <tr>
              <TableHeader>Informações do arquivo</TableHeader>
            </tr>
          </thead>
          <tbody>
            {data.map((line, index) => (
              <tr key={index}>
                <TableData>{line}</TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Home;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Button from "../../Components/Button/index";

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


  const sendToDatabase = async (data) => {
    try {
      await Promise.all(data.map((item) => {
        // Utiliza URL da API para fazer a chamada ao backend
        return axios.post(`${process.env.REACT_APP_API_LOGIN}/inputfiles`, item);
      }));
      console.log('Dados enviados para o banco de dados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar os dados para o banco de dados:', error);
    }
  };


  const handleUpload = async () => {
    if (file) {
      try {
      const fileContent = await readFile(file);
      const parsedData = parseData(fileContent);
      await sendToDatabase(parsedData);
      setData(parsedData);
    } catch (error) {
      console.error(error);
    }
    }
  };
 
  const parseData = (fileContent) => {
    const lines = fileContent.split('\n');
    const parsedData = lines.map((line) => {
      const type = line.slice(0, 1);
      const date = line.slice(1, 11);
      const end = line.slice(-0).trim();

      const amountMatch = end.match(/00000(\d+)/);
      const sellerMatch = end.match(/[A-Z ]+(?=\s*$)/);

      const amount = amountMatch ? Number(amountMatch[1]) / 100 : 0;
      const seller = sellerMatch ? sellerMatch[0].trim() : '';
  
  
     // Formatando a data para "dd/mm/yyyy"
    const formattedDate = `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;


  // Formatando o amount para moeda brasileira
  const formattedAmount = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

       // Verificar e exibir a palavra presente na linha
       let product = '';
       if (line.includes('CURSO DE BEM-ESTAR')) {
         product = 'CURSO DE BEM-ESTAR';
       } else if (line.includes('DESENVOLVEDOR FULL STACK')) {
         product = 'DESENVOLVEDOR FULL STACK';
       } else if (line.includes('DOMINANDO INVESTIMENTOS')) {
         product = 'DOMINANDO INVESTIMENTOS';
       }

    return {
      type,
      date: formattedDate,
      product,
      amount: formattedAmount,
      seller,
    };
  })
  return parsedData;
};


  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('Error reading the file'));
      };

      reader.readAsText(file);
    });
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
         <Button
         type='button'
         text='Upload'
         onClick={handleUpload}
         />
      </FileUploaderContainer>

      {data.length > 0 && (
        <Table>
          <thead>
            <tr>
              <TableHeader>Tipo</TableHeader>
              <TableHeader>Data</TableHeader>
              <TableHeader>Produto</TableHeader>
              <TableHeader>Valor</TableHeader>
              <TableHeader>Vendedor</TableHeader>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <TableData>{item.type}</TableData>
                <TableData>{item.date}</TableData>
                <TableData>{item.product}</TableData>
                <TableData>{item.amount}</TableData>
                <TableData>{item.seller}</TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Home;
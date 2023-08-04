import styled from 'styled-components';


export const NavbarContainer = styled.nav`
  background-color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Brand = styled.h1`
  color: white;
  margin: 0;
`;

export const LogoutButton = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const FileUploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const UploadInput = styled.input`
  margin-bottom: 10px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

export const TableHeader = styled.th`
  border: 1px solid black;
  padding: 8px;
  background-color: #f2f2f2;
`;

export const TableData = styled.td`
  border: 1px solid black;
  padding: 8px;
`;

export const FirstRow = styled.tr`
  background-color: #00ff00; /* verde */
`;
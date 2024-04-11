import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Checkbox  } from '@material-ui/core';


const rows = [
  { labs_name: "Advanced Cell Models Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Cell Line Development & Molecular Virology Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Cell-Based Vaccines Development Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Translational Immunology Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "TCA Science and Services (others)", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Engineering Cellular Applications Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Cell Bioprocesses Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Novartis Pharma Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Sanofi Satellite Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Bayer Pharma Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Merck Healthcare Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Molecular Biophysics Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Analytical Services Unit", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Mass Spectrometry Unit", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Late-Stage R&D and Bioproduction Unit", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Food Safety & Microbiology Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Natural Bioactives and Nutraceuticals Area", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Membrane Processes Lab", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "R&D Major Projects (others)", first: 'Jon', corresp: 'Snow', other: 35 },
  { labs_name: "Biosystems and Data Science Group", first: 'Jon', corresp: 'Snow', other: 35 },
];

const SimpleTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Labs Name</strong></TableCell>
              <TableCell><strong>First</strong></TableCell>
              <TableCell><strong>Corresponding</strong></TableCell>
              <TableCell><strong>Other</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.labs_name}>
                <TableCell component="th" scope="row">
                  {row.labs_name} 
                </TableCell>
                <TableCell align="center"><Checkbox /></TableCell>
                <TableCell align="center"><Checkbox /></TableCell>
                <TableCell align="center"><Checkbox /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SimpleTable;

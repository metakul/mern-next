import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface RowData {
  [key: string]: string | number | boolean;
}

interface TableInfoProps {
  tableHeaders: string[];
  rows: RowData[];
  detaildedData?: RowData[]; // New prop for history data
  detailsText?: string; // Text for history
}

const CustomTable: React.FC<TableInfoProps> = ({
  tableHeaders,
  rows,
  detaildedData,
  detailsText,
}) => {
  const [openRow, setOpenRow] = useState<null | number>(null);

  const handleRowClick = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeaders.map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>
                  {detailsText &&
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleRowClick(index)}
                  >
                    {openRow === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  }
                </TableCell>
                {tableHeaders.map(header => (
                  <TableCell key={header}> {row[header] as React.ReactNode}</TableCell>
                ))}
              </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={tableHeaders.length + 1}>
                    <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          {detailsText}
                        </Typography>
                        <Table>
                          <TableBody>
                            { detaildedData && Object.entries(detaildedData[index]).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;

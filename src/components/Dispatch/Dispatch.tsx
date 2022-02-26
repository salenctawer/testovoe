import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { ElementsType } from '../../types/types';

type PropsType = {
  elements: Array<ElementsType>
  addObject: (received: string, pick: string, deliver: string, vehicle: string) => void
}

interface Column {
  id: 'received' | 'pick' | 'deliver' | 'vehicle' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

  const Dispatch: React.FC<PropsType> = (props) => {

    const [updateObject, setUpdateObject] = useState([])

    useEffect(() => {
      let timer = setInterval(() => {
        let date = '25-02-2022'
        let pick = 'Kiev'
        let deliver = 'Rostov'
        let vehicle = 'car'
        props.addObject(date, pick, deliver, vehicle)
        console.log('вызов прошел успешно')
      }, 2000);
      return () => clearInterval(timer);
    }, [props.elements]);

    for(let i=0;i<=2; i++){
      props.elements.sort((a: any, b: any) =>{
          a = a.received.split("/");
          b = b.received.split("/");
          return a[i]>b[i] ? -1 : a[i]<b[i] ? 1 : 0;
      }); 
  }

    const columns: readonly Column[] = [
      { id: 'received', label: 'Дата получения', minWidth: 170 },
      { id: 'pick', label: 'Забрать из', minWidth: 100 },
      {
        id: 'deliver',
        label: 'Доставить в',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
      },
      {
        id: 'vehicle',
        label: 'Транспортное средство',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
      }
    ];
    
    function createData(value: ElementsType) {
      let id = 0
      id = id +1
      return { received: value.received, pick: value.pick, deliver: value.deliver, vehicle: value.vehicle, id: id };
    }

  const rows = props.elements.reverse().map(item => createData(item))

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Dispatch
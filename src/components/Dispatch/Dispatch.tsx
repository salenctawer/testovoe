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
import { MapDispatchToPropsType, MapStateToPropsType } from './DispathContainer';
import RefreshIcon from '@mui/icons-material/Refresh';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './Dispatch.module.scss'

type PropsType = MapStateToPropsType & MapDispatchToPropsType

interface Column {
  id: 'received' | 'pick' | 'deliver' | 'vehicle' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
const cities = [
  'St. Petersburg',
  'Moscow',
  'Novosibirsk',
  'Yekaterinburg',
  'Kazan',
  'Samara',
  'Chelyabinks',
  'Rostov-on-Don',
  'Ufa',
  'Krasnoyarsk',
  'Perm',
  'Volgograd',
  'Voronezh',
  'Saratov',
  'Krasnodar',
  'Tolyatti',
  'Tyumen',
  'Izhevsk'
]
const vehicles =[
  'bus',
  'train',
  'car',
  'truck',
  'wagon'
]

  const Dispatch: React.FC<PropsType> = (props) => {

    const [updateObject, setUpdateObject] = useState(props.elements)
    const [workFunction, setWorkFunction] = useState(true)

    useEffect(() => {
      let timerOne = setInterval(() => {
        let date = new  Date()
        let dateYear = date.getUTCFullYear()
        let dateMonth = date.getUTCMonth()
        let dateDay = date.getUTCDay()
        let pickRandomIndex = Math.floor(Math.random() * cities.length);
        let pick = cities[pickRandomIndex]
        let deliverRandomIndex = Math.floor(Math.random() * cities.length);
        let deliver = cities[deliverRandomIndex]
        let carRandomIndex = Math.floor(Math.random() * vehicles.length);
        let vehicle = vehicles[carRandomIndex]
        let fullDate = `${dateYear}-${dateMonth}-${dateDay}`
        props.addObject(fullDate, pick, deliver, vehicle)
      }, 2000);
    }, [props.elements]);
    useEffect(()=>{
      let interval = setInterval(()=>{
        if(workFunction){
          setUpdateObject([...props.elements])
        }
        else{
          console.log('Автоматическое обновление сейчас не работает')
        }
      }, 5000)
      return () => clearInterval(interval)
    }, [props.elements, workFunction])

    for(let i=0;i<=2; i++){
      updateObject.sort((a:any, b:any) =>{
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
      },
      {
        id: 'vehicle',
        label: 'Транспортное средство',
        minWidth: 170,
        align: 'right',
      }
    ];
    
    let id = 0

    function createData(value: ElementsType) {
      id = id + 1
      return { received: value.received, pick: value.pick, deliver: value.deliver, vehicle: value.vehicle, idElement: id};
    }

  const rows = updateObject.reverse().map(item => createData(item))

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
    <div className={styles.dispatch}>
    <Paper sx={{ width: '1200px', overflow: 'hidden', paddingLeft:'85px', paddingRight:'80px' }}>
      <div className={styles.icons}>
          <div>
          <CheckCircleOutlineIcon sx={{cursor:'pointer'}} onClick={()=>setWorkFunction(true)}/>
          <DoDisturbIcon sx={{cursor:'pointer', marginLeft:'15px'}} onClick={()=>setWorkFunction(false)}/>
          </div>
        <RefreshIcon sx={{cursor:'pointer'}} onClick={()=> setUpdateObject([...props.elements])}/>
      </div>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.idElement}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { value}
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
    </div>
  );
}

export default Dispatch
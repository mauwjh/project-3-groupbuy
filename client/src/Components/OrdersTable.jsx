import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
  { field:'id', hide: true},
  { field: 'username', headerName: 'Username', minWidth: 200, flex: 1 },
  { field: 'qty', headerName: 'Quantity Reserved', minWidth: 150, flex: 1 },
  { field: 'address', headerName: 'Address', minWidth: 400, flex: 3 },
];


export default function OrdersTable({ordersData}) {

  const rows = 
    ordersData?.map((a,b) => ({id: b+1, username: a.buyer_id[0].username, qty: a.qty_reserved, address:a.buyer_id[0].address}))
  

  return (
    <div style={{ height: 400, width: '100%', marginBottom: '80px' }}>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
        disableSelectionOnClick
      /> */}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Quantity Reserved</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(a => {
            return(
              <TableRow>
                <TableCell>{a.username}</TableCell>
                <TableCell>{a.qty}</TableCell>
                <TableCell>{a.address}</TableCell>
              </TableRow>
              )
          })}
        </TableBody>
      </Table>
    </div>
  );
}
import { FC, useState } from 'react';
import { DataGrid, GridRowIdGetter, GridValidRowModel } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "./NoRowsOverlay";
import LoadingOverlay from './LoadingOverLay';

interface Column {
  field: string;
  headerName: string;
  width: number;
}

interface DatagridProps {
  columns: Column[];
  rows: GridValidRowModel[];
  getRowId: GridRowIdGetter<GridValidRowModel>;
  hideFooter?: boolean;
  loading:boolean | undefined
}

const CustomDataGrid: FC<DatagridProps> = ({getRowId, hideFooter, columns, rows, loading }) => {
  const [overlayHeight] = useState('300px');

  return (
    <>
    <DataGrid
      autoHeight
      columns={columns}
      rows={rows}
      getRowId={getRowId || ''}
      hideFooter={hideFooter}
      slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      sx={{ 
        '--DataGrid-overlayHeight': overlayHeight,
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, { value: 100, label: '100' }]}
      // onCellClick={(e)=>{
        
      // }}
      />
      <LoadingOverlay loading={loading}/>
      </>
  );
};

export default CustomDataGrid;

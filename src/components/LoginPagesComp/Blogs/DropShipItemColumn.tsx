import React from 'react';
import Button from '@mui/material/Button';
import {
  // MoreVert as MoreIcon,
  PreviewOutlined,
} from "@mui/icons-material";
import { Pages } from '@/Datatypes/enums';

const DropShipItemColumn = (
  setOpenMenu: (value: React.SetStateAction<HTMLElement | null>) => void,
  setSelectedRowId: (value: React.SetStateAction<string | null>) => void,
  handleNavigate: { (href: string): void; (arg0: string): void; }
) => [
    { field: "id", headerName: "Id", width: 120, editable: false },
    { field: "author", headerName: "Author Name", width: 120, editable: false },
    {
      field: "title",
      headerName: "Title",
      width: 120,
      editable: false,
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   width: 120,
    //   editable: false,
    // },
    // {
    //   field: "image",
    //   headerName: "Image Info",
    //   width: 120,
    //   editable: false,
    // },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: false,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      editable: false,
      renderCell: (params: { row: { id: string; title: string }; }) => (
        <div>
          {/* <Button
            variant="contained"
            onClick={(event) => {
              setOpenMenu(event.currentTarget);
              setSelectedRowId(params.row.dropShipItemsId);
            }}
          >
            <MoreIcon />
          </Button> */}
      
          <div onClick={(event) => {
            setOpenMenu(event.currentTarget);
            setSelectedRowId(params.row.id);
            const { id, title } = params.row;
            handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', title).replace(':id', id)}`);
          }}>
            <Button variant="contained">
              <PreviewOutlined />
            </Button>
          </div>
        </div>
      )
    },
  ];

export default DropShipItemColumn;
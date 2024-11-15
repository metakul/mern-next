
"use client"
import  React, { useState, useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectedDropShipItems } from '@/lib/slices/DropShip/DropShipSlice';
import { AppDispatch } from '@/lib/store';
// import { IFetchDropShipItemData } from '@/Datatypes/interfaces/interface';
import DropShipItemColumn from './DropShipItemColumn';
import CustomDataGrid from '../../DataGrid';
import SearchBar from '@/components/SearchBar';
import { RefreshOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchDropShipItemsApi } from '@/lib/slices/DropShip/DropShipAPI';


interface DropShipItemInfo {
    status: string;
  }

const AddDropShipItemComp: React.FC<DropShipItemInfo>=({status}) => {



    const [searchQuery, setSearchQuery] = useState("");
    const [/*openMenu*/, setOpenMenu] = useState<HTMLElement | null>(null);
    const [/*selectedRowId*/, setSelectedRowId] = useState<string | null>(null);
    const navigate = useNavigate(); 

    const handleNavigate = (href: string) => {
      navigate(href);
    };
    const columns = DropShipItemColumn(setOpenMenu, setSelectedRowId,handleNavigate)

    const dispatch = useDispatch()
    let {dropShipItems,loading} = useSelector(selectedDropShipItems)

    const fetchData = (status: string) => {
        // const userType: IFetchDropShipItemData = {
        //     userType: "user",
        // };
        (dispatch as AppDispatch)(fetchDropShipItemsApi({ status:status }));

    };
    
    useEffect(() => {
        (dispatch as AppDispatch)(fetchDropShipItemsApi({ status:status }));
    }, []);

    const handleRefresh = () => {
        dropShipItems=[]
        fetchData(status =="pending" ? "pending" : status); 
    };

    const filteredRows = dropShipItems.filter((row) =>
        row?.status === status && 
        row?.dropShipItemsId?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
        

    // const updateDropShipItemStatus = (status: unknown) => {
    //     // Assuming updateUserByPage takes userId and status to update the user
    //     setOpenMenu(null);
    // };

    return (

        <Box sx={{ width: "100%", position: "relative" }} className="sm:w-full overflow-hidden mx-auto ">
            <Paper sx={{ mb: 2, overflow: "hidden", borderRadius: 4, padding: 2 }}>
                <Container sx={{
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <RefreshOutlined sx={{mb:2}} onClick={handleRefresh} />
                </Container>
                
                <CustomDataGrid loading={ loading} getRowId={(row: { dropShipItemsId?: string }) => row.dropShipItemsId || ''} columns={columns} rows={filteredRows} />
                {/* <UserOptionsMenu
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    options={options}
                    selectedRowId={selectedRowId}
                    onClick={updateDropShipItemStatus}
                /> */}
            </Paper>
        </Box>
    );
};

export default AddDropShipItemComp;
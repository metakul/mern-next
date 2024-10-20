
"use client"
import  React, { useState, useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectedBlogs } from '@/lib/slices/Blogs/BlogSlice';
import { AppDispatch } from '@/lib/store';
import { fetchBlogApiSlice } from '@/lib/slices/Blogs/BlogApiSlice';
// import { IFetchBlogData } from '@/Datatypes/interfaces/interface';
import BlogColumn from './blogColumn';
import CustomDataGrid from '../../DataGrid';
import SearchBar from '@/components/SearchBar';
import { RefreshOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import UserOptionsMenu from '@/components/OptionMenu';
// import { Person as PersonIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";


interface BlogInfo {
    status: string;
  }

const AddBlogComp: React.FC<BlogInfo>=({status}) => {

    // const options = [
    //     { label: "Approve", value: "approve", icon: PersonIcon },
    //     { label: "Scheduled Post", value: "reject", icon: PersonIcon },
    //     { label: "Edit", value: "suspend", icon: DeleteIcon },
    //     { label: "Revoke Post", value: "suspend/revoke", icon: DeleteIcon }
    // ];
    

    const [searchQuery, setSearchQuery] = useState("");
    const [/*openMenu*/, setOpenMenu] = useState<HTMLElement | null>(null);
    const [/*selectedRowId*/, setSelectedRowId] = useState<string | null>(null);
    const navigate = useNavigate(); 

    const handleNavigate = (href: string) => {
      navigate(href);
    };
    const columns = BlogColumn(setOpenMenu, setSelectedRowId,handleNavigate)

    const dispatch = useDispatch()
    let {blogs,loading} = useSelector(selectedBlogs)

    const fetchData = (status: string) => {
        // const userType: IFetchBlogData = {
        //     userType: "user",
        // };
        (dispatch as AppDispatch)(fetchBlogApiSlice({ status:status }));

    };
    
    useEffect(() => {
        (dispatch as AppDispatch)(fetchBlogApiSlice({ status:status }));
    }, []);

    const handleRefresh = () => {
        blogs=[]
        fetchData(status =="pending" ? "pending" : status); 
    };

    const filteredRows = blogs.filter((row) =>
        row?.status === status && 
        row?.blogId?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
        

    // const updateBlogStatus = (status: unknown) => {
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
                
                <CustomDataGrid loading={ loading} getRowId={(row: { blogId?: string }) => row.blogId || ''} columns={columns} rows={filteredRows} />
                {/* <UserOptionsMenu
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    options={options}
                    selectedRowId={selectedRowId}
                    onClick={updateBlogStatus}
                /> */}
            </Paper>
        </Box>
    );
};

export default AddBlogComp;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CryptoInfoProps } from '@/Datatypes/interfaces/interface';
import { AppDispatch } from '@/lib/store';
import { fetchCryptoDispatcher } from '@/lib/slices/Blogs/BlogApiSlice';
import { Box, Paper } from '@mui/material';
import { selectedBlogs } from '@/lib/slices/Blogs/BlogSlice';
import CustomTable from '../DataGrid/Table';
import { RowData } from '../DataGrid/Table';

const CryptoInfoPage: React.FC<CryptoInfoProps> = ({ _id, cryptoSymbol }) => {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectedBlogs);

  const fetchCryptoInfo = async () => {
    try {
      (dispatch as AppDispatch)(fetchCryptoDispatcher({_id, cryptoSymbol,currency:"USD" }));
    } catch (error) {
      console.error('Error fetching crypto info:', error);
    }
  };

  useEffect(() => {
    fetchCryptoInfo();
  }, []);

  const filteredBlogs = cryptoData.blogs.filter(blog => blog.postId === _id);
  
  const rowData: RowData[] = filteredBlogs.map(blog => {
    const row: RowData = { ...blog.cryptoData };
    return row;
  });
  const cryptoDataObj = filteredBlogs.length > 0 ? filteredBlogs[0].cryptoData : null;

  return (
    <div>
      <Box sx={{ width: "100%", position: "relative" }} className="sm:w-full overflow-hidden mx-auto ">
        <Paper sx={{ mb: 2, overflow: "hidden", borderRadius: 4, padding: 2 }}>
          <CustomTable
            tableHeaders={cryptoDataObj ? Object.keys(cryptoDataObj) : []}
            rows={rowData}
            detailsText={"Details"}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default CryptoInfoPage;

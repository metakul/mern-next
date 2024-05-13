// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CryptoInfoProps } from '../../interfaces/interface';
// import { AppDispatch } from '../../redux/store';
// import { fetchCryptoDispatcher } from '../../redux/slices/Blogs/BlogApiSlice';
// import { Box, Paper } from '@mui/material';
// import BlogColumn from './blogColumn';
// import { selectedBlogs } from '../../redux/slices/Blogs/BlogSlice';
// import CustomDataGrid from '../DataGrid';

// const CryptoInfoPage: React.FC<CryptoInfoProps> = ({_id, cryptoSymbol }) => {
//   const dispatch = useDispatch();
//   const columns = BlogColumn();
//   const cryptoData = useSelector(selectedBlogs);

//   const fetchCryptoInfo = async () => {
//     try {
//       // Dispatch the action to fetch crypto info
//        (dispatch as AppDispatch)(fetchCryptoDispatcher({_id, cryptoSymbol,currency:"USD" }));
//     } catch (error) {
//       console.error('Error fetching crypto info:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch crypto info when the component mounts
//     fetchCryptoInfo();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Filter blogs based on _id
//   const filteredBlogs = cryptoData.blogs.filter(blog => blog._id === _id);

//   // Create a rowData constant for logging purposes
//   const rowData = filteredBlogs.map(blog => {
//     const row = { ...blog.cryptoData, id: blog._id };
//     return row;
//   });
//   // Log the rowData
//   console.log("Row Data:", rowData);
//   return (
//     <div>
//       <Box sx={{ width: "100%", position: "relative" }} className="sm:w-full overflow-hidden mx-auto ">
//         <Paper sx={{ mb: 2, overflow: "hidden", borderRadius: 4, padding: 2 }}>
//         <CustomDataGrid
//             getRowId={(row: { _id?: string }) => row._id || ''}
//             columns={columns}
//             rows={rowData} 
//              />
//         </Paper>
//       </Box>
//     </div>
//   );
// };

// export default CryptoInfoPage;


// //todo add chart, old data, extra data for each crypto here
// blogAction.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoadedBlogs, addBlog, fetchCryptoInfo } from './BlogSlice';
import { ApiError, CryptoData, CryptoInfoProps } from '../../../Datatypes/interfaces/interface';
import Request from '@/Backend/axiosCall/apiCall';
import { ApiSuccess } from '../../../Datatypes/interfaces/interface';
import { IFetchBlogData } from '../../../Datatypes/interfaces/interface';
import { Iblog } from '../../../Datatypes/interfaces/interface';

export const fetchBlogApiSlice = createAsyncThunk(
  'blogCollection/setLoadedBlogs',
  async ({ pageSize, blogPage, setBlogPage, status }: {  pageSize?: number, blogPage?: number, setBlogPage?: (page: number) => void, status: string }, { rejectWithValue, dispatch }) => {
    dispatch(setLoadedBlogs({
      loading: true,
    }));
    try {
      const response = await Request({
        endpointId: "GETBLOG",
        slug: `?status=${status}&pagesize=${pageSize}&page=${blogPage}`,
      })
      
      const blogs: Iblog[] = response;
      const transformedBlogs = blogs.map(blog => ({
        ...blog,
        blogId: blog.id
      }));

      dispatch(setLoadedBlogs({ blogData: transformedBlogs, loading: false }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Blogs Fetched SuccessFully',
        data: response.data,
      };
      if (blogPage && setBlogPage) {
        setBlogPage(blogPage + 1)
      }

      return apiSuccess;

    } catch (error) {
      dispatch(setLoadedBlogs({
        loading: false,
      }));
      const castedError = error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
export const fetchSingleBlogApiSlice = createAsyncThunk(
  'blogCollection/setLoadedBlogs',
  async ({ fetchBlogData }: { fetchBlogData:{fetchBlogData: IFetchBlogData, blogId?: string} }, { rejectWithValue, dispatch }) => {
    dispatch(setLoadedBlogs({
      loading: true,
    }));
    try {
      const response = await Request({
        endpointId: "GETSINGLEBLOG",
        slug: `/${fetchBlogData.blogId}`,
      })
    
      console.log(response,"responseresponse");
      
      const blogs: Iblog = response[0];

      const { id: blogId, ...rest } = blogs;
      const updatedBlogs = { blogId, ...rest };

      dispatch(setLoadedBlogs({ blogData: [updatedBlogs], loading: false }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Blogs Fetched SuccessFully',
        data: response.data,
      };

      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const addBlogApiSlice = createAsyncThunk(
  'blogCollection/addBlog',
  async ({ newBlogData, setDialogOpen, blogType,userType }: { newBlogData: Iblog, setDialogOpen: (open: boolean) => void, blogType?: string, userType:string }, { rejectWithValue, dispatch }) => {
    try {

      let response
      if (blogType == "edit") {
        response = await Request({
          endpointId: "EDIT_BLOG",
          slug: `/${newBlogData.blogId}`,
          data: newBlogData,
        });
        const loadForUser: IFetchBlogData = {
          userType
        }
        dispatch(fetchSingleBlogApiSlice({fetchBlogData:{ fetchBlogData: loadForUser, blogId: newBlogData.blogId} })); // Dispatch addBlog action with new blog data

      }
      else {
        response = await Request({
          endpointId: "ADD_BLOG",
          data: newBlogData,
        });
      }
      const newBlog: Iblog = response?.data?.newBlog || response?.data

      const { id: blogId, ...rest } = newBlog;
      const updatedBlogs = { blogId, ...rest };
      dispatch(addBlog(updatedBlogs)); // Dispatch addBlog action with new blog data

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Blog Added Successfully',
        data: response.data,
      };

      setDialogOpen(false)

      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);


export const updateBlogSlice = createAsyncThunk(
  'blogCollection/addBlog',
  async ({ blogId, status, userType }: { status: string, blogId?: string, userType: string }, { rejectWithValue, dispatch }) => {
    try {

      const response = await Request({
        endpointId: "UPDATE_BLOG",
        slug: `/${blogId}`,
        data: {status:status,id:blogId},
      });
      const loadForUser: IFetchBlogData = {
        userType
      }

      dispatch(fetchSingleBlogApiSlice({ fetchBlogData:{fetchBlogData: loadForUser, blogId: blogId} })); // Dispatch addBlog action with new blog data

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Blog Updated Successfully',
        data: response.data,
      };
      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

//fetch Blogs CryptoData

export const fetchCryptoDispatcher = createAsyncThunk(
  'FetchCryptoInfo',
  async ({ cryptoSymbol, _id, currency }: CryptoInfoProps, { rejectWithValue, dispatch }) => {
    try {
      const response = await Request({
        endpointId: "FetchCryptoInfo",
        slug: `/${cryptoSymbol}/${currency}`,
        data: { cryptoSymbol },
      })

      //todo add propoer data for cryptoInfo
      const cryptoData: CryptoData = {
        cryptoSymbol: response.data.asset_id_base,
        currency: response.data.asset_id_quote,
        price: response.data.rate,
        marketCap: response.data.time
      };
      dispatch(fetchCryptoInfo({ _id: _id, cryptoData: cryptoData }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Crypto Info Fetched SuccessFully',
        data: response.data,
      };

      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);


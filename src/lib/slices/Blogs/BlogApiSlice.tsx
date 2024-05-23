// blogAction.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoadedBlogs, addBlog, fetchCryptoInfo } from './BlogSlice';
import { ApiError, CryptoData, CryptoInfoProps } from '../../../Datatypes/interfaces/interface';
import { ApiEndpoint } from '@/Datatypes/enums';
import Request from '@/Backend/axiosCall/apiCall';
import { ApiSuccess } from '../../../Datatypes/interfaces/interface';
import { FetchBlogData } from '../../../Datatypes/interfaces/interface';
import { Ipost } from '../../../Datatypes/interfaces/interface';

export const fetchBlogApiSlice = createAsyncThunk(
  'blogCollection/setLoadedBlogs',
  // eslint-disable-next-line no-empty-pattern
  async ({ fetchBlogData, pageSize, blogPage, setBlogPage, status }: { fetchBlogData: FetchBlogData, pageSize?: number, blogPage?: number, setBlogPage?: (page: number) => void, status: string }, { rejectWithValue, dispatch }) => {
    dispatch(setLoadedBlogs({
      loading: true,
    }));
    try {
      console.log("userType", fetchBlogData.userType, status)
      const response = await Request({
        endpointId: "GETBLOG",
        slug: `?status=${status}&pagesize=${pageSize}&page=${blogPage}`,
      })
      console.log(response);
      
      const blogs: Ipost[] = response;
      const transformedBlogs = blogs.map(blog => ({
        ...blog,
        postId: blog.id
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
      console.error('Error Fetching Blogs:', error);
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
export const fetchSingleBlogApiSlice = createAsyncThunk(
  'blogCollection/setLoadedBlogs',
  // eslint-disable-next-line no-empty-pattern
  async ({ fetchBlogData, blogId }: { fetchBlogData: FetchBlogData, blogId?: string }, { rejectWithValue, dispatch }) => {
    dispatch(setLoadedBlogs({
      loading: true,
    }));
    try {
      console.log("userType", fetchBlogData.userType)
      const response = await Request({
        endpointId: "GETSINGLEBLOG",
        slug: `/${blogId}`,
      })
      const blogs: Ipost = response;

      const { _id: postId, ...rest } = blogs;
      const updatedBlogs = { postId, ...rest };

      dispatch(setLoadedBlogs({ blogData: [updatedBlogs], loading: false }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Blogs Fetched SuccessFully',
        data: response.data,
      };

      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError
      console.error('Error Fetching Blogs:', error);
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const addBlogApiSlice = createAsyncThunk(
  'blogCollection/addBlog',
  async ({ newBlogData, setDialogOpen, postType,userType }: { newBlogData: Ipost, setDialogOpen: (open: boolean) => void, postType?: string, userType:string }, { rejectWithValue, dispatch }) => {
    try {

      let response
      if (postType == "edit") {
        response = await Request({
          endpointId: "EDIT_BLOG",
          slug: `/${newBlogData.postId}`,
          data: newBlogData,
        });
        const loadForUser: FetchBlogData = {
          userType
        }
        dispatch(fetchSingleBlogApiSlice({ fetchBlogData: loadForUser, blogId: newBlogData.postId })); // Dispatch addBlog action with new blog data

      }
      else {
        response = await Request({
          endpointId: "ADD_BLOG",
          data: newBlogData,
        });
      }
      const newBlog: Ipost = response?.data?.newPost || response?.data

      const { _id: postId, ...rest } = newBlog;
      const updatedBlogs = { postId, ...rest };
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
      console.error('Error Adding Blog:', error);
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);


export const updateBlogSlice = createAsyncThunk(
  'blogCollection/addBlog',
  async ({ postId, status, userType }: { status: string, postId?: string, userType: string }, { rejectWithValue, dispatch }) => {
    try {

      const response = await Request({
        endpointId: "UPDATE_BLOG",
        slug: `/${postId}`,
        data: {status:status},
      });
      const loadForUser: FetchBlogData = {
        userType
      }

      dispatch(fetchSingleBlogApiSlice({ fetchBlogData: loadForUser, blogId: postId })); // Dispatch addBlog action with new blog data

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Blog Updated Successfully',
        data: response.data,
      };
      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError;
      console.error('Error Adding Blog:', error);
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

      console.log(apiSuccess);
      return apiSuccess;

    } catch (error) {
      const castedError = error as ApiError
      console.error('Failed To Load:', error);
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);


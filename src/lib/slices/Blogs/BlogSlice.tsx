import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogsState, CryptoData, Iblog } from '../../../Datatypes/interfaces/interface';

const initialState: BlogsState = {
  blogs: []as Iblog[],
  loading:false
};

interface CryptoInfo {
  _id: string;
  cryptoData: CryptoData;
}

const blogCollectionSlice = createSlice({
  name: 'blogsCollection',
  initialState,
  reducers:(create)=>({
    setLoadedBlogs: create.reducer ((state, action: PayloadAction<{ blogData?: Iblog[],loading:boolean }>) => {
      const loadedBlogs = action.payload.blogData;
      loadedBlogs && loadedBlogs.forEach(blog => {
        if (!state.blogs.some(existingBlog => existingBlog.blogId === blog.blogId)) {
          state.blogs.push(blog);
        }
      })
      state.loading=action.payload.loading
    }),
    addBlog: create.reducer ((state, action: PayloadAction<Iblog>) => {
      state.blogs.push(action.payload);
    }),
    fetchCryptoInfo: create.reducer ((state, action: PayloadAction<CryptoInfo>) => {
      const { _id, cryptoData } = action.payload;
      const index = state.blogs.findIndex(blog => blog.blogId === _id);
      if (index !== -1) {
        state.blogs[index].cryptoData = cryptoData;
      }
    }),
  }),
});

export const { setLoadedBlogs, addBlog, fetchCryptoInfo } = blogCollectionSlice.actions;

export default blogCollectionSlice.reducer;

export const selectedBlogs = (state: { blogsCollection: BlogsState }) =>
  state.blogsCollection;

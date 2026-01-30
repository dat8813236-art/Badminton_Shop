import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import {getDataUser} from '../../API/home'


export const fetchListUser = createAsyncThunk(
    'fetchListUser',
    async ({ page, limit, search }) => {
        const resp = await getDataUser(page, limit, search);
        return resp.data
    }
)


const initialState = {
  list:  [],
  total: 0,
  paging: {
    page: 1,
    limit: 10
  },
  search: '',
  show: false
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setValueTotal: (state, action) => {
            state.total = action.payload
        },
        setPaging: (state, action) => {
            state.paging.page = action.payload.page
        },
        setSearch: (state, action ) => {
            state.search = action.payload
        },
        setShow: (state, action) => {
            state.show = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListUser.fulfilled, (state, action) => {
            state.list = action.payload
        })
         builder.addCase(fetchListUser.rejected, (state, action) => {
            state.list = []
        })
    }
}) 

export const { setValueTotal , setPaging, setSearch, setShow} = homeSlice.actions

export default homeSlice.reducer

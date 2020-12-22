import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import {client} from '../../api/client'

/*const initialState = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
  ]
*/
export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) =>
  state.users.find(user => user.id === userId);
  
const initialState = [];

export const fetchUsers = createAsyncThunk('Users/fetchUsers',async () => {
    const response = await client.get('/fakeApi/users')
    return response.users
  });


  const UsersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:{
        [fetchUsers.fulfilled]:(state,action) => {
            return action.payload; 
        }
    }
});

export default UsersSlice.reducer;
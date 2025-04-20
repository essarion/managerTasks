import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";


type newUser = {
    name: string,
    email: string,
    password: string,
}

type UserResponse = {
    id: string;
    name: string;
    email: string;
}


export const sendNewUser = createAsyncThunk<UserResponse, newUser>('createUser/sendNewUser', async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post<UserResponse>('https://67cee895823da0212a80a977.mockapi.io/taskapp/users', {
            name: name,
            email: email,
            password: password,
        })
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message)
    }
})


type UserState = {
    newUser: UserResponse | null;
    loading: boolean;
    error: string | null;
};

const userSlice = createSlice({
    name: 'createUser',
    initialState: {
        newUser: null as UserResponse | null,
        loading: false,
        error: null as string | null
    } as UserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendNewUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(sendNewUser.fulfilled, (state, action) => {
                state.loading = false
                state.newUser = action.payload
            })
            .addCase(sendNewUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string | null
            })
    }
})

export default userSlice
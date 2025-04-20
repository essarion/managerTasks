import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

type UserIn = {
    email: string;
    password: string;
}

type UserResponse = {
    id: string;
    name: string;
    email: string;
}

export const Login = createAsyncThunk<UserResponse, UserIn>('loginUser/Login',
    async (userIn) => {
        try {
            await axios.get('https://67cee895823da0212a80a977.mockapi.io/taskapp/users?email=${UserIn.email}&password=${UserIn.password}')
        }
    })
import { createSlice } from "@reduxjs/toolkit";

import { loginUser, registerUser, logoutUser } from "./authThunk";


interface User {
    _id: string;
    name: string;
    email: string
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null
}

const savedAuth = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
const parsedAuth: User | null = savedAuth ? JSON.parse(savedAuth) : null;



const initialState: AuthState = {
    user: parsedAuth,
    isAuthenticated: !!parsedAuth,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false
            localStorage.removeItem("auth"); // 🔹 clear here too
        }
    },
    extraReducers: (builder) => {
        builder
            // 🔹 Handle register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // 🔹 Handle login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                // console.log("🔹 loginUser.fulfilled payload:", action.payload);

                state.isAuthenticated = true;

                // 🔹 persist to localStorage

                localStorage.setItem("auth", JSON.stringify(action.payload))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // 🔹 Handle logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
                localStorage.removeItem("auth");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
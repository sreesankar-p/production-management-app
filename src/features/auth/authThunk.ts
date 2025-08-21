// features/auth/authThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { AppDispatch, RootState } from '@/lib/store';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log("🔹 Login API Response: 👈 ", data);
      if (!response.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error(await response.text());
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

// Add other auth-related thunks as needed
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  // Add logout logic here
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Logout failed"
    );
  }

});
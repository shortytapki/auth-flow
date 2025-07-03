import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  RegistrationData,
  VerificationData,
  LoginData,
  AuthState,
} from "./types";
import { authApi } from "@/shared/api/auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationEmail: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegistrationData, { rejectWithValue }) => {
    try {
      const result = await authApi.register(data);
      if (result?.data?.access_token) {
        localStorage.setItem("token", result.data.access_token);
      }
      return result;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verify",
  async (data: VerificationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      const result = await authApi.verify(data, token);
      return result;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Verification failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      await authApi.getCsrfCookie();

      const loginResult = await authApi.login(data);
      if (loginResult?.data?.access_token) {
        localStorage.setItem("token", loginResult.data.access_token);
      }

      const userInfo = await authApi.getUserInfo();
      return userInfo;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.registrationEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationEmail = action.meta.arg.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.registrationEmail = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;

import { create } from 'zustand'
import api from "../APIs/axios";   //  use api instead of axios

export const useAuth = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  authLoading: true,

  login: async (userCred) => {
    const { role, ...userCrdObj } = userCred;

    try {
      set({ loading: true, error: null });

      const res = await api.post("/common-api/login", userCrdObj); //  FIX

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload
      });

    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.error || 'Login Failed',
        isAuthenticated: false,
        currentUser: null
      });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });

      await api.get("/common-api/logout"); // FIX
      
      localStorage.removeItem("token");

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null
      });

    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.error || 'Logout Failed',
        isAuthenticated: false,
        currentUser: null
      });
    }
  },

  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/common-api/check-auth"); // FIX

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });

    } catch (err) {

      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  }
}));
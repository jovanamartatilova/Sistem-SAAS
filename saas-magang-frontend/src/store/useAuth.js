import { create } from 'zustand';
import api from '../lib/api';

const useAuth = create((set) => ({
    user: null,
    token: localStorage.getItem('auth_token') || null,
    isAuthenticated: !!localStorage.getItem('auth_token'),
    loading: false,
    error: null,

    login: async (username, password) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/login', { username, password });
            const { user, token } = response.data;

            localStorage.setItem('auth_token', token);
            set({ user, token, isAuthenticated: true, loading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Login gagal. Periksa username dan password.',
                loading: false
            });
            return false;
        }
    },

    register: async (userData) => {
        set({ loading: true, error: null });
        console.log('Sending registration data:', userData);
        try {
            const response = await api.post('/register', userData);
            const { user, token } = response.data;

            localStorage.setItem('auth_token', token);
            set({ user, token, isAuthenticated: true, loading: false });
            return true;
        } catch (err) {
            console.error('Registration error details:', err.response?.data);
            const message = err.response?.data?.message || err.response?.data?.error || 'Registration failed';
            const errors = err.response?.data?.errors ?
                Object.values(err.response.data.errors).flat().join(', ') :
                '';

            set({
                error: errors ? `${message}: ${errors}` : message,
                loading: false
            });
            return false;
        }
    },

    logout: async () => {
        try {
            await api.post('/logout');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('auth_token');
            set({ user: null, token: null, isAuthenticated: false });
        }
    },

    fetchUser: async () => {
        if (!localStorage.getItem('auth_token')) return;

        set({ loading: true });
        try {
            const response = await api.get('/me');
            set({ user: response.data.user, isAuthenticated: true, loading: false });
        } catch (err) {
            localStorage.removeItem('auth_token');
            set({ user: null, token: null, isAuthenticated: false, loading: false });
        }
    },
}));

export default useAuth;

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getFirebaseIdToken } from './firebase/client';
import { adminRoutes, publicPaths, publicPost } from '@/configs/config';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const isPublicGet = config.method === 'get' && publicPaths.some((path) => config.url?.startsWith(path));
        const isPublicPost = config.method === 'post' && publicPost.some((path) => config.url?.startsWith(path));

        const isAdminEndpoint = adminRoutes.some((path) => config.url?.startsWith(path));
        const preventPublicAccess = !isPublicGet && !isPublicPost;

        /**
         * prevnet public access means:
         * add auth token for - all admin endpoints
         */
        if (isAdminEndpoint || preventPublicAccess) {
            const token = await getFirebaseIdToken();
            if (token) config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        /**
         * Token refresh failed, user needs to re-login
         */
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await getFirebaseIdToken(true);

                if (newToken && originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch {
                /**
                 * Token refresh failed, redirect to login
                 */
                window.location.href = '/login';
            }
        }

        const errorResponse = {
            message: (error.response?.data as { message?: string })?.message || error.message || 'An error occurred',
            status: error.response?.status || 500,
            data: error.response?.data,
        };

        return Promise.reject(errorResponse);
    }
);

export default apiClient;

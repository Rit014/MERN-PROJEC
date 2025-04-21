import axios from 'axios';
import { API_NOTIFICATION_MESSAGES } from '../constants/config.js';
import { SERVICE_URLS } from '../constants/config.js';
import { getType } from '../utils/common-utils.js';

const API_URL = 'http://localhost:8000';  // Replace with your backend URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json, multipart/form-data",
    }
});

// Request Interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (config.TYPE?.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE?.query) {
            config.url = `${config.url}/${config.TYPE.query}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Response Interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    async function (error) {
        const originalRequest = error.config;

        // If 401 error and the request has not been retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const res = await axios.post(`${API_URL}/token`, { token: refreshToken });

                if (res.status === 200) {
                    const newAccessToken = res.data.accessToken;

                    // Store new access token
                    localStorage.setItem('accessToken', newAccessToken);

                    // Update headers and retry original request
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed", refreshError);
                // Optionally redirect to login or notify user
            }
        }

        return Promise.reject(processError(error));
    }
);

// Success and Error Processors
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

const processError = (error) => {
    if (error.response) {
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else {
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },
        });
}

export default API;

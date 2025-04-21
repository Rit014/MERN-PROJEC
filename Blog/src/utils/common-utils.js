// Function to get access token from localStorage
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

// Function to get refresh token from cookies
export const getRefreshToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; refreshToken=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to add ellipsis if string exceeds limit
export const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
}

// Function to determine the type of request based on the value and body
export const getType = (value, body) => {
    if (value.params) {
        return { params: body };
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id };
        } else {
            return { query: body };
        }
    }
    return {};
}

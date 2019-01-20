const TOKEN_NAME = 'user-token';

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_NAME));

export const setToken = token => localStorage.setItem(TOKEN_NAME, JSON.stringify(token));

export const removeToken = () => localStorage.removeItem(TOKEN_NAME);

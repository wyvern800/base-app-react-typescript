import api from '../api';

export const tokenKey = 'token';

/**
 * Function used to check if user is logged in or not
 */
const isUserLogged = (): boolean => {
  return localStorage.getItem(tokenKey) !== null;
};

/**
 * Function used to get the logged in user's informations
 */
const getCurrentUser = async (): Promise<unknown> => {
  const user = await api.get(`/users/profile`, {
    headers: {
      Authorization: localStorage.getItem(tokenKey),
    },
  });
  return user;
};

/**
 * Checks if user is admin or normal member
 */
const isUserAdmin = async (): Promise<unknown> => {
  const response = await api.get(`/authadmin`, {
    headers: {
      Authorization: localStorage.getItem(tokenKey),
    },
  });
  return response;
};

/**
 * Clears the token from user's storage
 */
const clearToken = async (): Promise<void> => {
  localStorage.removeItem(tokenKey);
};

/**
 * Method triggered when we login
 *
 * @param {string} username User's usrname
 * @param {string} password User's password
 */
const login = async (username: string, password: string): Promise<unknown> => {
  const response = await api
    .post('/auth/login', {
      username,
      password,
    })
    .catch(() => {
      clearToken();
    });
  return response;
};

/**
 * Triggered when we're logging out
 */
const logout = async (): Promise<void> => {
  const response = await api
    .post('/auth/login', {
      headers: {
        Authorization: localStorage.getItem(tokenKey),
      },
    })
    .then(() => {
      clearToken();
    })
    .catch(() => console.error('API error'));
  return response;
};

/**
 * Registers an user
 */
const registerUser = async (data: unknown): Promise<unknown> => {
  const response = await api
    .post('/users', data, {
      headers: {
        Authorization: localStorage.getItem(tokenKey),
      },
    })
    .catch((err: unknown) => {
      throw err;
    });
  return response;
};

export default {
  login,
  clearToken,
  logout,
  getCurrentUser,
  isUserLogged,
  isUserAdmin,
  registerUser,
};

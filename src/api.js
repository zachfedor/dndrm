const API_ROOT = '/api';

/**
 * Check if JSON Web Token exists in Local Storage
 */
const hasToken = () => {
  return !!window.localStorage.getItem('api_token');
};

/**
 * Save JSON Web Token to Local Storage
 */
const setToken = (token) => {
  window.localStorage.setItem('api_token', token);
};

/**
 * Remove JSON Web Token from Local Storage
 */
const removeToken = () => {
  window.localStorage.setItem('api_token', '');
};

/**
 * Custom fetch wrapper
 *
 * @param url string - API endpoint to be appended to root URL
 * @param options object - Object to configure fetch request
 * @param body object - (Optional) For post/put request data
 * @return Promise - Resolves with response data or rejects with error
 */
const _fetch = (url, customOptions, body=null) => {
  // Attach existing JSON Web Token to outgoing request headers
  const token = window.localStorage.getItem('api_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Build fetch configuration
  const options = {
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  // Stringify and attach request body
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Build full URL and send request
  return fetch(`${API_ROOT}/${url}`, options)
    .then(async response => {
      // If response is Unauthorized, remove expired/invalid token and
      // reload the page. App component has logic to redirect to /login
      if (response.status === 401) {
        removeToken();
        window.location.assign(window.location);
        return;
      }

      // Convert response stream to JSON and resolve successful call, or
      // manually reject call with 400/500 errors for catch block to be
      // handled in the calling component's logic
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

/**
 * API Client Object
 *
 * Wraps specific request methods to build consistent app-wide API calls,
 * for example:
 *   api.get(`user/${id}`).then(data => console.log(data.user));
 */
const api = {
  delete: (url, options={}) =>
    _fetch(url, Object.assign({ method: 'DELETE' }, options)),
  get: (url, options={}) => 
    _fetch(url, Object.assign({ method: 'GET' }, options)),
  post: (url, body, options={}) =>
    _fetch(url, Object.assign({ method: 'POST' }, options), body),
  put: (url, body, options={}) =>
    _fetch(url, Object.assign({ method: 'PUT' }, options), body),
  hasToken,
  setToken,
  removeToken,
};

export default api;

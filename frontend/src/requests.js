import axios from 'axios';

const requests = {
  axios: (url, method='GET', headers={}, data={}) => {
    if (method === 'GET' || method === 'DELETE') {
      headers = {
        'Accept': 'application/json; charset=utf-8',
        ...headers
      };
    } else {
      headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
        ...headers
      };
    }

    const options = {
      headers
    };

    if (method === 'POST') {
      return axios.post(url, data, options);
    } else if (method === 'PUT') {
      return axios.put(url, data, options);
    } else if (method === 'DELETE') {
      options.params = data;
      return axios.delete(url, options);
    } else {
      options.params = data;
      return axios.get(url, options);
    }
  },
  fetch: (url, method='GET', headers={}, data={}) => {
    if (method === 'GET' || method === 'DELETE') {
      headers = {
        'Accept': 'application/json; charset=utf-8',
        ...headers
      };
    } else {
      headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
        ...headers
      };
    }

    const options = {
      method,
      headers,
    };

    if (method === 'POST') {
      options.body = JSON.stringify(data);
      return fetch(url, options);
    } else if (method === 'PUT') {
      options.body = JSON.stringify(data);
      return fetch(url, options);
    } else if (method === 'DELETE') {
      const queryString = new URLSearchParams(data).toString();
      return fetch(`${url}?${queryString}`, options);
    } else {
      const queryString = new URLSearchParams(data).toString();
      return fetch(`${url}?${queryString}`, options);
    }
  }
};

export default requests;

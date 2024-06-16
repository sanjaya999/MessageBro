import axios from 'axios';

export const baseUrl = 'http://localhost:9001/api/v1/user';

export const postReq = async (url, body, config = {}) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...config.headers, // Merge any custom headers
      },
      ...config, // Spread any additional config settings
    });
    return response.data;
  } catch (error) {
    console.error('Cannot make post request', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

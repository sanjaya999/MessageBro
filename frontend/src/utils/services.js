import axios from 'axios';

export const baseUrl = 'http://localhost:9001/api/v1/user';

export const postReq = async (url, body, config = {}) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...config.headers, 
      },
      ...config, 
    });
    if (response.status >= 200 ) {
      return { ok: true, data: response.data };
    } else {
      return { ok: false, error: response.data.message || 'Request failed' };
    }
  } catch (error) {
    console.error('Cannot make post request', error.response || error);
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message || 'An error occurred' 
    };
  }
};


export const getReq = async(url , body , config={})=>{

  try {
    const response = await axios.get(url)
    const data = await response.data;
    if (response.status >= 200 ) {
      return { ok: true, data: response.data };
    } else {
      return { ok: false, error: response.data.message || 'Request failed' };
    }
  } catch (error) {
    console.error('Cannot make get request', error.response || error);
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message || 'An error occurred' 
    };
  }

}
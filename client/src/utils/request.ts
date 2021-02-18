import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const sendGetRequest = async (path: string, params = {}): Promise<any> => {
  try {
    const res = await axios.get(BASE_URL + path, {
      params,
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(`error: ${error}`);
    return error;
  }
};

const sendPostRequest = async (path: string, body = {}): Promise<any> => {
  try {
    const res = await axios.post(BASE_URL + path, body, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(`error: ${error}`);
    return error;
  }
};

export { sendGetRequest, sendPostRequest };

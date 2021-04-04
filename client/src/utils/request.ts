import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

interface returnObject {
  result?: any;
  error?: any;
}

const sendGetRequest = async (
  path: string,
  params = {},
): Promise<returnObject> => {
  try {
    const result = await axios.get(BASE_URL + path, {
      params,
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    if (result.status !== 200) throw new Error(result.data.message);
    return { result: result.data };
  } catch (error) {
    return { error };
  }
};

const sendPostRequest = async (
  path: string,
  body = {},
): Promise<returnObject> => {
  try {
    const result = await axios.post(BASE_URL + path, body, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    if (result.status !== 200) throw new Error(result.data.message);
    return { result: result.data };
  } catch (error) {
    return { error };
  }
};

const sendPutRequest = async (
  path: string,
  body = {},
): Promise<returnObject> => {
  try {
    const result = await axios.put(BASE_URL + path, body, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    if (result.status !== 200) throw new Error(result.data.message);
    return { result: result.data };
  } catch (error) {
    return { error };
  }
};

export { sendGetRequest, sendPostRequest, sendPutRequest };

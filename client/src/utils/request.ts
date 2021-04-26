import axios from 'axios';
import { ERROR } from './message';

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
    return { result: result.data };
  } catch (error) {
    validateToken();
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
    return { result: result.data };
  } catch (error) {
    validateToken();
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
    return { result: result.data };
  } catch (error) {
    validateToken();
    return { error };
  }
};

const validateToken = () => {
  if (!localStorage.getItem('token')) {
    alert(ERROR.NOT_VALID_TOKEN);
    window.location.replace('/');
  }
};

export { sendGetRequest, sendPostRequest, sendPutRequest };

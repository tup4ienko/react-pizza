import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Pizza from '../models/pizza';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'https://643d7f93f0ec48ce905dded5.mockapi.io';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(
    async (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      handleErrorResponse(error);
      return Promise.reject(error);
    }
  );
  
  function handleErrorResponse(error: AxiosError) {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        handleBadRequestError(data, config);
        break;
      case 401:
        handleUnauthorizedError();
        break;
      case 403:
        handleForbiddenError();
        break;
      case 404:
        handleNotFoundError();
        break;
      case 500:
        handleServerError(data);
        break;
      default:
        break;
    }
  }
  
  function handleBadRequestError(data: any, config: AxiosRequestConfig) {
    if (typeof data === 'string') {
      toast.error(data);
    } else if (config.method === "get" && data.errors.hasOwnProperty("id")) {
        toast.error("/not-found");
    } else if (data.errors) {
      const modalStateErrors = Object.values(data.errors).filter(error => error);
      throw modalStateErrors.flat();
    }
  }
  
  function handleUnauthorizedError() {
    toast.error("unauthorized");
  }
  
  function handleForbiddenError() {
    toast.error("forbidden");
  }

  function handleNotFoundError() {
    toast.error("/not-found");
  }
  
  function handleServerError(data: any) {
    toast.error("/server-error");
  }

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Pizzas = {
    list: () => requests.get<Pizza[]>(`/items`),
}


const agent = {
    Pizzas,
}

export default agent;

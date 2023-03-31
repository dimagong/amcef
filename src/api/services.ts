import axios from "axios";
import React from "react";


const instance = axios.create({
    baseURL: "https://640314fd302b5d671c467d24.mockapi.io/api/pages",
    headers: { "Content-Type": "application/json" },
});



const responseRejectInterceptor = (err: any) => {
    //todo handling error 
    if (err.response && err.response.status >= 400 && err.response.status <= 500) {
        return Promise.reject(new Error('Wrong status code'))
    } else {
        return Promise.reject(new Error('Something was wrong'))
      }

  };

instance.interceptors.response.use(response => response, responseRejectInterceptor);

export const serviceApi = {
    get: (endpoint: any) => instance.get(endpoint).then(response => response),
    delete: (args: any) => instance.delete(args).then(response => response),
    head: (args: any) => instance.head(args).then(response => response),
    post: (endpoint: any, data: any) => instance.post(endpoint, data).then(response => response),
    put: (args: any) => instance.put(args).then(response => response),
    patch: (args: any) => instance.patch(args).then(response => response),
  };
  
export const  getTasksApi = () => {
    return serviceApi.get("/tasks")
}

export const createTaskApi = (data: any) => {
    return serviceApi.post("/tasks", data)
}

export const  getTaskByIDApi = (taskId: string) => {
    return serviceApi.get(`/tasks/${taskId}`)
}


import { TaskPropsType } from "@/types";
import axios from "axios";



const instance = axios.create({
    baseURL: "https://640314fd302b5d671c467d24.mockapi.io/api/pages",
    headers: { "Content-Type": "application/json" },
});



const responseRejectInterceptor = (err: any) => {
    //todo handling error 
    if (err.response && err.response.status >= 400 && err.response.status <= 500) {
        const message = err.response.message ?? err.message ??  'Wrong status code'
        return Promise.reject(new Error(message))
    } else {
        return Promise.reject(new Error('Something was wrong'))
    }

};



instance.interceptors.response.use(response => response, responseRejectInterceptor);

export const serviceApi = {
    get: (endpoint: any) => instance.get(endpoint).then(response => response),
    delete: (endpoint: any) => instance.delete(endpoint).then(response => response),
    head: (args: any) => instance.head(args).then(response => response),
    post: (endpoint: any, data: any) => instance.post(endpoint, data).then(response => response),
    put: (endpoint: any, data: any) => instance.put(endpoint, data).then(response => response),
    patch: (args: any) => instance.patch(args).then(response => response),
  };
  
export const  getTasksApi = () => {
    return serviceApi.get("/tasks")
}

export const createTaskApi = (data: Partial<TaskPropsType>)  => {
    return serviceApi.post("/tasks", data)
}

export const  getTaskByIDApi = (taskId: string | number) => {
    return serviceApi.get(`/tasks/${taskId}`)
}

export const updateTaskApi = (id: string | number, data: TaskPropsType) => {
    return serviceApi.put(`/tasks/${id}`, data)
}

export const deleteTaskApi = (id: string | number) => {
    return serviceApi.delete(`/tasks/${id}`)
}

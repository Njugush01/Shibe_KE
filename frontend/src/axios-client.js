import axios from "axios"

const axiosClient = axios.create({
baseURL: `${import.meta.env.VITE_API_BASE_URL}/api` 
})

axiosClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})


axiosClient.interceptors.response.use((response) =>{    //onFulfilled
    return response;
}, (error) =>{          //onRejected
    const {response} = error;  //destructure the error and take up the response
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    } 

    throw error;

})

export default axiosClient;
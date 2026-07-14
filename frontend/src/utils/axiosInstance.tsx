import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

/*axiosInstance.interceptors.request.use(
(config)=>{

const AccessToken=Cookies.get("AccessToken");
if(AccessToken){

    config.headers['Authorization']=`Bearer ${AccessToken}`
}

return config;

},
(error)=> Promise.reject(error)

  
);
*/

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orignalRequest = error.config;

    if (error.response?.status === 401 && !orignalRequest._retry) {
      orignalRequest._retry = true;

      try {
        await axiosInstance.post("/user/refresh-token");

        return axiosInstance(orignalRequest);
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
  },
);

export default axiosInstance;

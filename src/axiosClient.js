import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Create a cache for requests
const cache = new Map();

// Add request interceptor for caching
axiosClient.interceptors.request.use(
  (config) => {
    const cacheKey = config.url;
    if (config.method === "get" && cache.has(cacheKey)) {
      const data = cache.get(cacheKey);
      // Return cached data if it's less than 5 minutes old
      if (Date.now() - data.timestamp < 5 * 60 * 1000) {
        config.adapter = () => {
          return Promise.resolve({
            data: data.value,
            status: 200,
            statusText: "OK",
            headers: {},
            config,
            request: {},
          });
        };
      } else {
        cache.delete(cacheKey);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for caching and error handling
axiosClient.interceptors.response.use(
  (response) => {
    // Cache successful GET requests
    if (response.config.method === "get") {
      cache.set(response.config.url, {
        value: response.data,
        timestamp: Date.now(),
      });
    }
    return response;
  },
  (error) => {
    console.error("API Error:", error.response);
    return Promise.reject(error);
  }
);

export default axiosClient;

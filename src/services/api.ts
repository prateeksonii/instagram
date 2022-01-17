import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = "http://10.0.2.2:4000";

export const publicApi = axios.create({
  baseURL,
});

export const privateApi = axios.create({
  baseURL,
});

privateApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("instagram_clone_token");
    if (token) {
      config.headers!.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  }
);

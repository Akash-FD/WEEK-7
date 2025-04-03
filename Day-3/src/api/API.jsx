import axios from "axios";
import endpoint from "./endpoint";

const API = axios.create({
    baseURL : endpoint.ServerBaseUrl,
})

export default API;
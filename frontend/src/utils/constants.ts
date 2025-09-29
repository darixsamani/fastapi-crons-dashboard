import axios from "axios";

const API = "http://0.0.0.0:8080/";

export const axionsInstance = axios.create({
    baseURL: API,
    maxRedirects: 5, // Number of redirects to follow automatically
    headers: {
        "Accept": "*",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "Origin",
    },
})
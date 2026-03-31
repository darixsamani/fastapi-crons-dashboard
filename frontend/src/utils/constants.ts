import axios from "axios";
export {};

const API = "http://0.0.0.0:8080/"

localStorage.setItem("apiUrl", API)

export const axionsInstance = axios.create({
    baseURL: localStorage.getItem("apiUrl") || API,
    maxRedirects: 5, // Number of redirects to follow automatically
    headers: {
        "Accept": "*",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "Origin",
    },
})
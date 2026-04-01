export {};

const API = "http://0.0.0.0:8080/api";

if (!localStorage.getItem("apiUrl")) {
    localStorage.setItem("apiUrl", API);
}

export const API_BASE_URL = localStorage.getItem("apiUrl") || API;

export const buildApiUrl = (path: string) => {
    if (!path) {
        return API_BASE_URL;
    }

    return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
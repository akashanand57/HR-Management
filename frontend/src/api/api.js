import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (userData) => API.post("/auth/register", userData);
export const getCandidates = () => API.get("/candidates");
export const getEmployees = () => API.get("/employees");
export const getLeaves = () => API.get("/leaves");
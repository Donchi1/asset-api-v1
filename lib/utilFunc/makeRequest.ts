import axios from "axios";

export const makeRequestApi = axios.create({
    baseURL: "/api/routes"
  })
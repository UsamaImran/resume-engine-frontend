import { Api } from "../api";

export const coverLetterClient = new Api({
  baseURL:
    (import.meta.env.VITE_API_URL ||
      "http://localhost:3000/api/v1/cover-letter") + "/cover-letters",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

export const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://remesh-backend.herokuapp.com";

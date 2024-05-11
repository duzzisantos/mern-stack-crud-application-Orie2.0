export const getHost = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080";
  } else if (process.env.NODE_ENV === "production") {
    return process.env.SERVER_HOST;
  }
};

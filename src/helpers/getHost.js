export const getHost = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_SERVER;
  } else if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_HOSTNAME;
  }
};

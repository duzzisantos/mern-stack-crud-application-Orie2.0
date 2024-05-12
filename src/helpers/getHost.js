export const getHost = () => {
  if (process.env.NODE_ENV === "development") {
    console.log(process.env.REACT_APP_LOCAL);
    return process.env.REACT_APP_LOCAL;
  } else if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_SERVER;
  }
};

export const isLocal = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
export const localHost = process.env.REACT_APP_LOCAL;
export const server = process.env.REACT_APP_SERVER;

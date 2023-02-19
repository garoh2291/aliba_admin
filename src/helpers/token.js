export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

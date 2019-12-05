import axios from "axios";

const signup = (username, password) => {
  return axios
  .post("???", {
    username: username,
    password: password
  })
  .then(response => {
    return response.data;
  })
  .catch(err => {
    return err.response.data;
  });
};

const login = (username, password) => {
  return axios
  .post("???", {
    username: username,
    password: password
  })
  .then(response => {
    return response.data;
  })
  .catch(err => {
    return err.response.data;
  });

};

const logout = () => {
  axios.delete("???");
};

export { signup, login, logout };
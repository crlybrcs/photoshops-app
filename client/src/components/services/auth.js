import axios from 'axios';

const signup = (username, password) => {
<<<<<<< HEAD
	return axios
		.post('/api/auth-routes/signup', {
			username: username,
			password: password
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err.response.data;
		});
=======
  console.log(username, password)
  return axios
    .post("/api/auth/signup", {
      username: username,
      password: password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
>>>>>>> 22a40f2298de19423f4dbd6ed48bbb77b1176b68
};

const login = (username, password) => {
	return axios
		.post('/api/auth-routes/login', {
			username: username,
			password: password
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err.response.data;
		});
};

const logout = () => {
	axios.delete('/api/auth-routes/logout');
};

export { signup, login, logout };

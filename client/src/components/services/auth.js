import axios from 'axios';

const signup = (username, password) => {
	// return axios
	// 	.post('/api/auth-routes/signup', {
	// 		username: username,
	// 		password: password
	// 	})
	// 	.then((response) => {
	// 		return response.data;
	// 	})
	// 	.catch((err) => {
	// 		return err.response.data;
	// 	});
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

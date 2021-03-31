const set_authentication = (localStorage, axios) => {
  const auth_data = JSON.parse(localStorage.getItem("auth_data"));
  if (auth_data && auth_data.access_token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth_data.access_token}`;
  }
}

export default set_authentication
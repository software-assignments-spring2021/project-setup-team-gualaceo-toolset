const set_authentication = (localStorage, axios) => {
  const auth_data = JSON.parse(localStorage.getItem("auth_data"));
  if (auth_data && auth_data.access_token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth_data.access_token}`;
  }
}

const get_bearer = (localStorage) => {
  const auth_data = JSON.parse(localStorage.getItem("auth_data"));

  if (auth_data && auth_data.access_token) {
    return auth_data.access_token
  } 

  return null;
}

const is_expired = (localStorage) => { //returns true if the current Spotify API session is expired
  let expiry_time = localStorage.getItem('expiry_time')
  let cur_time = new Date().getTime()
  if (!expiry_time || cur_time >= expiry_time)
  {
    return true;
  } else {
    return false;
  }
}

export {set_authentication, get_bearer, is_expired}
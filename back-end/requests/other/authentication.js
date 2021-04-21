const set_authentication = (bearer_token, axios) => {
    if (bearer_token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${bearer_token}`;
      return true //indicates success
    } else {
        console.log("Error: Perhaps no bearer token was passed to set_authentication in the back-end")
        return false //indicates failure
    }
  }

module.exports = {
    set_authentication: set_authentication
}
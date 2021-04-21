const assert = require('chai').assert
const axios = require("axios")
let Group = require("../models/groups.model");
const is_in_group = require('../helper_methods/is_in_group.js').is_in_group
const is_valid_playlist = require('../helper_methods/is_valid_playlist').is_valid_playlist
const mongoose = require("mongoose");
const run_add_to_pool_tests = require("./add_to_pool.js").run_add_to_pool_tests
const set_authentication = require("../requests/other/authentication").set_authentication


require("dotenv").config();

const bearer = process.env.npm_config_bearer
if (!bearer)
{
  console.log("No bearer specified (specify using --bearer=<bearer_token>). Aborting.")
  return
}

run_add_to_pool_tests(bearer)

// const begin_tests = async (bearer => {
//   //check for a valid bearer token
//   set_authentication(bearer, axios)

//   const valid = await axios('https://api.spotify.com/v1/me')
//   .then(res => {
//     return true
//   })
//   .catch(err => {
//     return false
//   })

//   if (!valid)
//   {
//     console.log("Was unable to get user's profile, Bearer token is most likely invalid. Aborting.")
//     return
//   }


//   return
// })
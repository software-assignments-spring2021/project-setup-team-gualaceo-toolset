// Make sure the back-end is running when running tests. use the command 'npm run test --bearer=<bearer_token>' to
// run tests. If you have any trouble, please let me know - Ryan

const assert = require("chai").assert;
const axios = require("axios");
let Group = require("../models/groups.model");
let User = require("../models/groups.model");
const is_in_group = require("../helper_methods/is_in_group.js").is_in_group;
const is_valid_playlist = require("../helper_methods/is_valid_playlist")
  .is_valid_playlist;
const mongoose = require("mongoose");
const run_add_to_pool_tests = require("./add_to_pool.js").run_add_to_pool_tests
const run_unit_tests = require("./unit_tests.js").run_unit_tests
const set_authentication = require("../requests/other/authentication").set_authentication

require("dotenv").config();
let back_end_uri = process.env.BACK_END_URI

const bearer = process.env.npm_config_bearer
if (!bearer)
{
  console.log("No bearer specified. Will run no authentication required unit tests.")
  run_unit_tests()
  return
}

//Run the add to pool and remove from pool tests
run_add_to_pool_tests(bearer)

//create a group for testing purposes
let group_id;

//Testing for add_to_pool endpoint
describe("Check user info", async () => {
  before(async () => {
    //connect to MongoDB
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri, {
      keepAlive: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    //create a test group
    const members = ["rbx2co", "jonoto", "123milkman"]
    const banned_members = ["jonoto"]
    const owners = ["rbx2co"]
    const playlist_id = ""
    const pool = []
    const group = new Group({banned_members: banned_members, members: members, owners: owners, generated_playlist_id: playlist_id, pool: pool}) //this MUST correspond to the order specified in the schema
    let passed = await group.save()
      .then(res => {
        console.log("test group saved successfully!")
        group_id = group._id
        return true
      })
      .catch(err => {
        console.log(err)
        console.log("error encountered saving test group, this may cause test failures")
        return false
      })

      if (!passed)
      {
        return
      }
  })

  describe("see information about yourself", async () => {
    it("can show your groups", async () => {
      const user = "denniskuzminer"; //note, as this is hardcoded,
      let status_code;
      let passed = await axios
        .get(`${back_end_uri}/groups/me/${user}`)
        .then((res) => {
          status_code = res.status;
        })
        .catch((err) => {
          //status_code = err.status
          console.log(err);
        });

      assert.strictEqual(status_code, 200); //indicates success
    });

    it("can show a group based on its id", async () => {
      const group = "6075333ffd54816234d7fdc6"; //note, as this is hardcoded, if the playlist is deleted this test will fail! I don't plan on deleting it, but I ever do accidentally, please change the playlist id here
      let status_code;

      let passed = await axios
        .get(`${back_end_uri}/groups/id/${group}`)
        .then((res) => {
          status_code = res.status;
        })
        .catch((err) => {
          //console.log(err.message)
          console.log(err);
        });

      assert.strictEqual(status_code, 200);
    });
  });

  describe("add a user", async () => {
    it("can add a new user", async () => {
      let status_code;
      let passed = await axios
        .post(`${back_end_uri}/users/add`, {
          username: "dk3730",
        })
        .then((res) => {
          status_code = res.status;
        })
        .catch((err) => {
          //status_code = err.status
          console.log(err);
        });

      assert.strictEqual(status_code, 200); //indicates success
    });
  });

  //delete the temporary group we've created for the sake of these tests
  after(async () => {
    Group.deleteOne({ _id: group_id })
      .then(() => {
        console.log("deleted group successfully!");
      })
      .catch((err) => {
        console.log("Error: could not delete group created for these tests");
        console.log(err);
      });
    User.deleteOne({ user: "dk3730" })
      .then(() => {
        console.log("deleted user successfully!");
      })
      .catch((err) => {
        console.log("Error: could not delete user created for these tests");
        console.log(err);
      });
  });
});

describe('post_playlist, get_playlist helper methods', async () => {
  
})

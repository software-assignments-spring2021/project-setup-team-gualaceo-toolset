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
const set_authentication = require("../requests/other/authentication").set_authentication

require("dotenv").config();
let back_end_uri = process.env.BACK_END_URI
let bearer = null


//create a group for testing purposes
let group_id;
let user_id = "rbx2co"

//run_add_to_pool_tests(bearer)

//Testing for add_to_pool endpoint
describe("Check user info", async () => {
  before(async () => {
    //connect to MongoDB
    const uri = process.env.ATLAS_URI;
    console.log("uri = ", uri)
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

  describe("is_in_group tests", async () => {
    it("Group id is an object", () => {
      assert.typeOf(group_id, "object")
    })

    it("current user is in group", async () => {
      let in_group = await is_in_group(user_id, group_id)
      assert.isTrue(in_group)
    })

    it("'jonoto' is not in group (banned user)", async () => {
      let in_group = await is_in_group("jonoto", group_id) //this should return an error
      assert.isTrue(in_group instanceof Error)
    })

    it("'shelly15' is not in group", async () => {
      let in_group = await is_in_group("shelly15", group_id)  //this should return an error
      assert.isTrue(in_group instanceof Error)
    })
  })


  //delete the temporary group we've created for the sake of these tests
  after(async () => {
    Group.deleteOne({ _id: group_id })
      .then(() => {
      })
      .catch((err) => {
        console.log("Error: could not delete group created for these tests");
        console.log(err);
      });
  });
})
// Make sure the back-end is running when running tests. use the command 'npm run test --bearer=<bearer_token>' to
// run tests. If you have any trouble, please let me know - Ryan

const assert = require('chai').assert
const axios = require("axios")
let Group = require("../models/groups.model");
const is_in_group = require('../helper_methods/is_in_group.js').is_in_group
const is_valid_playlist = require('../helper_methods/is_valid_playlist').is_valid_playlist
const mongoose = require("mongoose");

require("dotenv").config();

const bearer = process.env.npm_config_bearer
if (!bearer)
{
  console.log("Warning: No bearer specified! Some tests may fail as a result")
}

//create a group for testing purposes
let group_id

//Testing for add_to_pool endpoint
describe('add to pool (and related methods)', async () => {
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

  describe("is_in_group tests", async () => {
    it("Group id is an object", () => {
      assert.typeOf(group_id, "object")
    })

    it("'rbx2co' is in group", async () => {
      let in_group = await is_in_group("rbx2co", group_id)
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

  describe("is_valid_playlist tests", async () => {
    it("valid playlist is valid", async () =>{  //note, as this is hardcoded, if the playlist is deleted this test will fail! I don't plan on deleting it, but I ever do accidentally, please change the playlist id here
      const playlist_id = "3PLPVWNT4CMjqSLpoRThxf"
      let is_valid = await is_valid_playlist(bearer, playlist_id)
      assert.isTrue(is_valid)
    })

    it("123 is invalid playlist", async () => {
      const playlist_id = "123"
      let is_valid = await is_valid_playlist(bearer, playlist_id)
      assert.isFalse(is_valid)
    })
  })

  describe("add_to_pool tests", async () => {
    it('can add to pool', async () => {
      const playlist_id = "3PLPVWNT4CMjqSLpoRThxf" //note, as this is hardcoded, if the playlist is deleted this test will fail! I don't plan on deleting it, but I ever do accidentally, please change the playlist id here
      let status_code
      let passed = await axios.put(`http://localhost:5000/groups/add_to_pool/${group_id}/${playlist_id}/${bearer}`) 
        .then((res) => {
          status_code = res.status
        })
        .catch(err => {
          //status_code = err.status
          console.log(err)
        })
      
      assert.strictEqual(status_code, 200) //indicates success
    })

    it('can not add the same playlist twice', async () => {
      const playlist_id = "3PLPVWNT4CMjqSLpoRThxf" //note, as this is hardcoded, if the playlist is deleted this test will fail! I don't plan on deleting it, but I ever do accidentally, please change the playlist id here
      let status_code

      let passed = await axios.put(`http://localhost:5000/groups/add_to_pool/${group_id}/${playlist_id}/${bearer}`) 
        .then((res) => {
          status_code = res.status
          return true
        })
        .catch(err => {
          //console.log(err.message)
          return false
        })
      
      assert.isFalse(passed) //In this case, we desire failure
    })
  })
  
  //delete the temporary group we've created for the sake of these tests
  after(async () => {
    Group.deleteOne({_id: group_id})
      .then(() => {
        console.log("deleted group successfully!")
      })
      .catch((err) => {
        console.log("Error: could not delete group created for these tests")
        console.log(err)
      })
  })
})

describe('post_playlist, get_playlist helper methods', async () => {
  
})
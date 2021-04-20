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
    const id = ""
    const pool = []
    const group = new Group({banned_members: banned_members, members: members, owners: owners, id: id, pool: pool}) //this MUST correspond to the order specified in the schema
    await group.save()
      .then(res => {
        console.log("test group saved successfully!")
        group_id = group._id
      })
      .catch(err => {
        console.log(err)
        console.log("error encountered saving test group, this may cause test failures")
      })
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



//Testing add_members endpoint
describe('testing add_members endpoint', async () => {
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
    const members = ["Bob","Ben","Bill"]
    const banned_members = ["Brent"]
    const owners = ["Bob"]
    const id = ""
    const pool = []
    const group = new Group({banned_members: banned_members, members: members, owners: owners, id: id, pool: pool}) 
    await group.save()
      .then(res => {
        console.log("test group saved successfully!")
        group_id = group._id
      })
      .catch(err => {
        console.log(err)
        console.log("error encountered saving test group, this may cause test failures")
      })
  })

  describe("testing scenarios where users cannot be added to group", async () => {
    it("Group id is an object", () => {
      assert.typeOf(group_id, "object")
    })

    it("test that 'Bob' is in group", async () => {
      let in_group = await is_in_group("Bob", group_id)
      assert.isTrue(in_group)
    })

    it("test that'Brent' is banned", async () => {
      let in_group = await is_in_group("Brent", group_id)
      assert.isTrue(in_group instanceof Error)
    })

  })

  describe("add_to_pool tests", async () => {
    it('test trying to add already existing user', async () => {
      let status_code
      let user_id ="Brent"
      let passed = await axios.put(`http://localhost:5000/groups/add_members/${group_id}/${user_id}`) 
        .then((res) => {
          status_code = res.status
          return true
        })
        .catch(err => {
          return false
        })
      
      assert.isFalse(passed) //user already in group doesn't need to be added
    })

    it('test trying to add banned user', async () => {
      let user_id ="Brent"
      let passed = await axios.put(`http://localhost:5000/groups/add_members/${group_id}/${user_id}`) 
        .then((res) => {
          return true
        })
        .catch(err => {
          return false
        })
      
      assert.isFalse(passed) //banned user cannot be added 
    })

    it('test trying to add new user', async () => {
      let user_id ="Blake"
      let passed = await axios.put(`http://localhost:5000/groups/add_members/${group_id}/${user_id}`) 
        .then((res) => {
          return true
        })
        .catch(err => {
          return false
        })
      
      assert.isTrue(passed) //new user is successfully added
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
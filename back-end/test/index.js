const assert = require('chai').assert
let Playlist = require("../models/playlists.model");
const is_in_group = require('../helper_methods/is_in_group.js').is_in_group
const mongoose = require("mongoose");

require("dotenv").config();

//create a group for testing purposes
let group_id

describe('Group Tests', async () => {
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
    const songs = []
    const pool = []
    const playlist = new Playlist({members, banned_members, owners, songs, pool})
    await playlist.save()
      .then(res => {
        console.log("test group saved successfully!")
        group_id = playlist._id
      })
      .catch(err => {
        console.log("error encountered saving test group, this may cause a crash")
      })
  })

   describe("is_in_group", async () => {
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
})
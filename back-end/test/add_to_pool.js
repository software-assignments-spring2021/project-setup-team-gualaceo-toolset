// Make sure the back-end is running when running tests. use the command 'npm run test --bearer=<bearer_token>' to
// run tests. If you have any trouble, please let me know - Ryan

const assert = require('chai').assert
const axios = require("axios")
let Group = require("../models/groups.model");
const is_in_group = require('../helper_methods/is_in_group.js').is_in_group
const is_valid_playlist = require('../helper_methods/is_valid_playlist').is_valid_playlist
const mongoose = require("mongoose");
const set_authentication = require("../requests/other/authentication").set_authentication

const sample_playlist_id = "3PLPVWNT4CMjqSLpoRThxf" //note, as this is hardcoded, if the playlist is deleted this test will fail! I don't plan on deleting it, but I ever do accidentally, please change the playlist id here
const other_user_sample_playlist_one = "26HeHZSvi7Q9BmRhxJxwt9"
const other_user_sample_playlist_two = "76bxZcSKj8D5lFnc2BgtWd"
let user_id = ""
const run_add_to_pool_tests = async bearer => {
 //Testing for add_to_pool endpoint
  describe('add to pool/remove from pool (and related methods)', async () => {
    //create a group for testing purposes
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
      const members = ["jonoto", "123milkman", "serus5"]
      const banned_members = ["jonoto"]
      const owners = ["rbx2co"]
      const generated_playlist_id = ""
      const playlist_one = {
        added_by: "serus5",
        playlist_id: other_user_sample_playlist_one,
      };
      const playlist_two = {
        added_by: "serus5",
        playlist_id: other_user_sample_playlist_two,
      }
      const pool = [playlist_one, playlist_two]
      const group = new Group({banned_members: banned_members, members: members, owners: owners, generated_playlist_id: generated_playlist_id, pool: pool}) //this MUST correspond to the order specified in the schema
      await group.save()
        .then(res => {
          console.log("test group saved successfully!")
          group_id = group._id
        })
        .catch(err => {
          console.log(err)
          console.log("error encountered saving test group, this may cause test failures")
        })
      if (!set_authentication(bearer, axios))
      {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
      }

      //get current user's user_id
      let passed = await axios("https://api.spotify.com/v1/me")
        .then((response) => {
          data = response.data
          user_id = data.id
          //console.log("Successfully pulled User ID from Spotify API")
          return true
        })
        .catch((err) => {
          return false
        })
      if (!passed)
      {
        console.log("could not get user_id")
        return
      }
      console.log("user_id = ", user_id)
      
    
      //add the currently logged in user to the members and owners list
      await Group.updateOne(
        { _id: group_id },
        {
          $push: { members: user_id , owners: user_id},
        },
        { safe: true, upsert: true }
      );
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

    describe("is_valid_playlist tests", async () => {
      it("valid playlist is valid", async () =>{  
        const playlist_id = sample_playlist_id
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
      // must add the currently logged in user first as a member and owner


      it('can add to pool', async () => {
        const playlist_id = sample_playlist_id 
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
        const playlist_id = sample_playlist_id 

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

    describe("remove from pool tests", async () => {
      it ('can remove from pool (if added by currently logged in user)', async () => {
        //note that this assumes the add_to_pool test passed
        const playlist_id = sample_playlist_id 
        let status_code
        let passed = await axios.delete(`http://localhost:5000/groups/remove_from_pool/${group_id}/${playlist_id}/${bearer}`) 
          .then((res) => {
            status_code = res.status
          })
          .catch(err => {
            //status_code = err.status
            console.log("Could not remove from pool (perhaps add_to_pool failed earlier)")
          })
        
        assert.strictEqual(status_code, 200) //indicates success
      })

      it ('can not remove from pool if already removed', async () => {
        const playlist_id = sample_playlist_id 
        let status_code
        let error = null
        let passed = await axios.delete(`http://localhost:5000/groups/remove_from_pool/${group_id}/${playlist_id}/${bearer}`) 
          .then((res) => {
            status_code = res.status
          })
          .catch(err => {
            error = err
          })
        
        assert.isNotNull(error) //indicates success
      })

      it ('can remove playlists added by other users if you are an owner', async () => {
        const playlist_id = other_user_sample_playlist_one

        let status_code
        let error = null
        let passed = await axios.delete(`http://localhost:5000/groups/remove_from_pool/${group_id}/${playlist_id}/${bearer}`) 
          .then((res) => {
            status_code = res.status
          })
          .catch(err => {
            error = err
          })
        
        assert.strictEqual(status_code, 200) //indicates success
      })
      
      it ('can not remove playlists added by others if not owner', async () => {
        //remove the current user from the owners list
        await Group.updateOne(
          { _id: group_id },
          {
            $pull: { owners: user_id},
          },
          { safe: true, upsert: true }
        );
        
        const playlist_id = other_user_sample_playlist_two
        let status_code
        let error = null
        let passed = await axios.delete(`http://localhost:5000/groups/remove_from_pool/${group_id}/${playlist_id}/${bearer}`) 
          .then((res) => {
            status_code = res.status
          })
          .catch(err => {
            error = err
          })
        
        assert.isNotNull(error) //indicates success
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
}

module.exports = {
  run_add_to_pool_tests: run_add_to_pool_tests
}
//these were tests that were removed from add_to_pool as they require a bearer token. They may be added back if you desire integration testing

//Run the add to pool and remove from pool tests

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

if (!bearer)
    {
      console.log("no bearer provided, skipping integration tests")
    } else if (!set_authentication(bearer, axios))
    {
      console.log("Error: could not run get_user_id due to bad authentication")
      return;
    }

    if (bearer)
    {
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
    }
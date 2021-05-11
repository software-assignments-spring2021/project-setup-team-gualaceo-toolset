const assert = require('chai').assert
const generate_playlist = require("../requests/post/generate_playlist")
const testing_data = require("./testing_data.js")

const run_unit_tests = async () => [
  describe('generate_playlist tests', async () => {
    describe('add_common_songs', async () => {
      it('can add common songs to uris array', async () => {
        let uris = []
        generate_playlist.add_common_songs(uris, testing_data.occurrences_data_1, 0.3, 50, {})
        //console.log(uris)
        assert.isTrue(arraysEqual(uris, testing_data.expected_uris_data_1))
      })
      it('Will not add any common songs if no space is left', async () => {
        let uris = ["uri_1", "uri_2"]
        generate_playlist.add_common_songs(uris, testing_data.occurrences_data_2, 0.3, 2, {})
        assert.strictEqual(2, uris.length)
      })
      it('Will add the proper ratio of songs', async () => {
        let uris = ["uri_1", "uri_2"]
        generate_playlist.add_common_songs(uris, testing_data.occurrences_data_1, 0.1, 10, {})
        assert.strictEqual(3, uris.length)
      })
    })
    describe('get_user_arrays', async () => {
      it('gets correct arrays', async () => {
        let result = generate_playlist.get_user_arrays(testing_data.playlists_data_3)
        assert.isNotFalse(result["brianlabarbera"])
        assert.isNotFalse(result["rbx2co"])
        assert.isTrue(arraysEqual(result["brianlabarbera"], testing_data.user_songs_data_3["brianlabarbera"]))
        assert.isTrue(arraysEqual(result["rbx2co"], testing_data.user_songs_data_3["rbx2co"]))
      })
      it ('gets empty object if no playlists are provided', async () => {
        let result = generate_playlist.get_user_arrays([])
        assert.isEmpty(result)
      })
    })
    describe('empty_user_arrays', async () => {
      it('returns true if user arrays are empty', async () => {
        assert.isTrue(generate_playlist.empty_user_arrays(testing_data.empty_user_arrays_data_4))
      })
      it('returns false if user arrays have content', async () => {
        assert.isFalse(generate_playlist.empty_user_arrays(testing_data.user_songs_data_3))
      })
    })
    describe('get_occurrences', async () => {
      it ('gets correct occurrences', async () =>{
        let result = generate_playlist.get_occurrences(testing_data.user_songs_data_5)
        assert.isTrue(arraysEqual(result[song_occurrences], testing_data.occurrences_data_5[song_occurrences]))
        assert.isTrue(arraysEqual(result[artist_occurrences], testing_data.occurrences_data_5[artist_occurrences]))
      })
    })
    describe('testing', async () =>{
      it('impossible', async () => {
        assert.isTrue(false)
      })
    })
  })
]

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;


  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

module.exports = {
  run_unit_tests: run_unit_tests
}
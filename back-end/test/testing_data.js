const occurrences_data_1 = {
    song_occurrences: [
        ["song_1", 3],
        ["song_2", 2],
        ["song 3", 2],
        ["song 4", 1]
    ],
    artist_occurrences: [
        ["artist_1", 5],
        ["artist_2", 2],
        ["artist_3", 3],
        ["artist_4", 1],
        ["artist_5", 4],
    ]
}

const occurrences_data_2 = {
    song_occurrences: [
        ["song_1", 2],
        ["song_2", 4],
        ["song_3", 4],
    ],
    artist_occurrences: [
        ["artist_1", 2],
        ["artist_2", 2],
        ["artist_3", 1],
        ["artist_4", 1],
        ["artist_5", 4],
    ]
}

const expected_uris_data_1 = [
    'spotify:track:song_1',
    'spotify:track:song_2',
    'spotify:track:song 3',
    'spotify:track:song 4'
  ]

module.exports = {
    occurrences_data_1: occurrences_data_1,
    occurrences_data_2: occurrences_data_2,
    expected_uris_data_1: expected_uris_data_1,
}
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

const playlists_data_3 =  [
{
    collaborative: false,
    description: 'ENGLISH ONLY !!!!',
    external_urls: {
    spotify: 'https://open.spotify.com/playlist/1hDCR5lJLu2Ej1uz7rOUBs'
    },
    followers: { href: null, total: 0 },
    href: 'https://api.spotify.com/v1/playlists/1hDCR5lJLu2Ej1uz7rOUBs',
    id: '1hDCR5lJLu2Ej1uz7rOUBs',
    images: [ [Object], [Object], [Object] ],
    name: 'ENGLISH',
    owner: {
    display_name: 'rbx2co',
    external_urls: [Object],
    href: 'https://api.spotify.com/v1/users/rbx2co',
    id: 'rbx2co',
    type: 'user',
    uri: 'spotify:user:rbx2co'
    },
    primary_color: null,
    public: true,
    snapshot_id: 'NTIsZDc5NjQzOWY4ZGIyMGVkMjRlOGRhZDY1YTRhOTQyNTdmZTZlOTlhZg==',   
    tracks: {
    href: 'https://api.spotify.com/v1/playlists/1hDCR5lJLu2Ej1uz7rOUBs/tracks?offset=0&limit=100',
    items: ["song_1", "song_2", "song_3,"],
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    total: 25
    },
    type: 'playlist',
    uri: 'spotify:playlist:1hDCR5lJLu2Ej1uz7rOUBs'
},
{
    collaborative: false,
    description: '日本語だ',
    external_urls: {
    spotify: 'https://open.spotify.com/playlist/0vhQb1143demHJTbTRjerl'
    },
    followers: { href: null, total: 0 },
    href: 'https://api.spotify.com/v1/playlists/0vhQb1143demHJTbTRjerl',
    id: '0vhQb1143demHJTbTRjerl',
    images: [ [Object], [Object], [Object] ],
    name: '日本語',
    owner: {
    display_name: 'brianlabarbera',
    external_urls: [Object],
    href: 'https://api.spotify.com/v1/users/brianlabarbera',
    id: 'brianlabarbera',
    type: 'user',
    uri: 'spotify:user:brianlabarbera'
    },
    primary_color: null,
    public: true,
    snapshot_id: 'MjcsNDU3ZjEwZDE4NzQzMTEwYjE2ZjNjZGFjZDQwZjg0MGFiYjMzMmQ0Mw==',   
    tracks: {
    href: 'https://api.spotify.com/v1/playlists/0vhQb1143demHJTbTRjerl/tracks?offset=0&limit=100',
    items: ["song_4", "song_5", "song_6,"],
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    total: 19
    },
    type: 'playlist',
    uri: 'spotify:playlist:0vhQb1143demHJTbTRjerl'
}
]

const user_songs_data_3 = {
  rbx2co: [ 'song_1', 'song_2', 'song_3,' ],
  brianlabarbera: [ 'song_4', 'song_5', 'song_6,' ]
}

const empty_user_arrays_data_4 = {
    rbx2co: [],
    birdboy: [],
}

module.exports = {
    occurrences_data_1: occurrences_data_1,
    occurrences_data_2: occurrences_data_2,
    expected_uris_data_1: expected_uris_data_1,
    playlists_data_3: playlists_data_3,
    user_songs_data_3: user_songs_data_3,
}
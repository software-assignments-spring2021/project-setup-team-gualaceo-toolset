const styles = (theme) => ({
  collapse: {
    color: theme.palette.secondary.main,
  },
  collapsedRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  collapsedAlbumCover: {
    height: 53,
    width: 53,
    flexShrink: 0,
    flexGrow: 0,
  },
  collapsedArtist: {
    marginLeft: "10px",
    fontSize: "12.5px",
  },
  collapsedTitle: {
    marginLeft: "10px",
    fontSize: "17px",
  },
  controls: {
    justifyContent: "space-between",
    margin: "20px",
  },
  duration: {
    justifyContent: "space-between",
    marginTop: "-24px",
    margin: "-15px",
  },
  collapsedDetails: {
    marginTop: "4px",
    marginBottom: "4px",
  },
  expandedRoot: {
    margin: "10px",
  },
  expandedAlbumCover: {
    marginLeft: "-5px",
    height: 300,
    width: 300,
    borderRadius: "10px",
    flexShrink: 0,
    flexGrow: 0,
  },
  expandedDetails: {
    marginTop: "50px",
    justifyContent: "left",
  },
  expandedSongTitle: {
    fontWeight: 900,
    fontSize: "20px",
  },
  main: {
    marginTop: "100px",
    margin: "20px",
  },
  playlistTitle: {
    color: theme.palette.secondary.main,
    fontSize: "15px",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  slider: { marginTop: "10px" },
});

export default styles;

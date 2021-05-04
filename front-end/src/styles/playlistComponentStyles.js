const styles = (theme) => ({
  accordionDetails: {
    padding: "0",
  },
  artistName: {
    fontSize: "12px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardSquareEdges: {
    display: "flex",
    justifyContent: "center",
    // borderRadius: "0px",
  },
  imageContainer: {
    display: "flex",
    height: "75px",
    width: "75px",
    alignItems: "center",
    justifyContent: "center",
  },

  playlistImage: {
    height: "75px",
    width: "75px",
  },
  playlistNameContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  songCard: {
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    alignText: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: "0px",
  },
  songName: {
    alignText: "center",
  },
  summaryContainer: {
    display: "flex",
    width: "90%",
    height: "120px",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  tracklistContainer: {
    width: "100%",
  },
});

export default styles;

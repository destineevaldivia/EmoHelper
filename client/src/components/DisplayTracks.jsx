// receive states and functions as props
const DisplayTracks = ({
  audioFeatures,
  selectedEmotion,
  valenceScore,
  savedTracks,
  updateSelectedTrack,
}) => {
  // logging input data for debugging
  console.log("in displaytracks audiofeature", audioFeatures);
  console.log("in displaytracks emo", selectedEmotion);
  console.log("in display tracks valencescore", valenceScore);
  console.log("in display tracks savedTracks", savedTracks);

  // Parse valenceScore as a float because its logging as a string
  const valScore = parseFloat(valenceScore);

  // Calculate the differences for all tracks
  const tracksWithDifference = audioFeatures.audio_features.map((track) => ({
    track,
    difference: Math.abs(track.valence - valScore),
  }));

  // Sort tracks by difference in ascending order
  tracksWithDifference.sort((a, b) => a.difference - b.difference);

  // Get the top 2 closest tracks to the specified 'valenceScore'
  const closestTracks = tracksWithDifference
    .slice(0, 2)
    .map((item) => item.track);
  console.log("Closest tracks:", closestTracks);

  //map over closestTracks and use the find method to look for a matching track in SavedTracks object, so I can render the properties of this object
  const matchedTracks = closestTracks.map((track) => {
    const matchingSavedTrack = savedTracks.items.find(
      (savedTrack) => savedTrack.track.id === track.id
    );
    if (matchingSavedTrack) {
      return matchingSavedTrack.track;
    }
  });

  // Function to handle user choice of a track
  const handleUserChoice = (chosenTrack) => {
    updateSelectedTrack(chosenTrack);
    console.log("chosen track", chosenTrack);
  };

  // Component JSX to render track info
  return (
    <>
      <div>
        <h3>Which of these two tracks best describes how you're feeling?</h3>
        <p>Click link to preview on Spotify then choose a track</p>
        <ul>
          {matchedTracks.map((track) => (
            <li key={track.id}>
              <img src={track.album.images[1].url} alt={track.album.images} />
              <div className="track-info">
                <a href={track.external_urls.spotify} target="_blank">
                  <h4>{track.name} </h4>
                </a>
              </div>
              <button
                className="choose-track-btn"
                onClick={() => handleUserChoice(track.name)}
              >
                Choose this track
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default DisplayTracks;

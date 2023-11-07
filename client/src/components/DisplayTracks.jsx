import { useEffect, useState } from "react";

const DisplayTracks = ({
  audioFeatures,
  selectedEmotion,
  valenceScore,
  savedTracks,
  updateSelectedTrack,
}) => {
  console.log("in displaytracks audiofeature", audioFeatures);
  console.log("in displaytracks emo", selectedEmotion);
  console.log("in display tracks valencescore", valenceScore);
  console.log("in display tracks savedTracks", savedTracks);

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

  const handleUserChoice = (chosenTrack) => {
    updateSelectedTrack(chosenTrack);
    console.log("chosen track", chosenTrack);
  };

  return (
    <>
      <div>
        <h3>Which of these two tracks best describes how you're feeling?</h3>
        <p>Click link to preview song on Spotify</p>
        <ul>
          {matchedTracks.map((track) => (
            <li key={track.id}>
              <a href={track.external_urls.spotify} target="_blank">
                {track.name}
              </a>
              <button onClick={() => handleUserChoice(track.name)}>
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

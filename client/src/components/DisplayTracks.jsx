import { useEffect, useState } from "react";

const DisplayTracks = ({
  audioFeatures,
  selectedEmotion,
  valenceScore,
  savedTracks,
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
  return (
    <>
      <div>
        <h3>
          Which of these two tracks from your Spotify library best describes how
          you're feeling?
        </h3>
        <ol>
          {matchedTracks.map((track) => (
            <li key={track.id}>
              <a href={track.external_urls.spotify} target="_blank">
                {track.name}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
export default DisplayTracks;

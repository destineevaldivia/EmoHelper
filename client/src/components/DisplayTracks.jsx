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

  return (
    <>
      <div>
        <h2>
          Which of these two tracks from your Spotify library best describes how
          you're feeling?
        </h2>
        <ul>
          {closestTracks.map((track) => (
            <li key={track.id}>
              <a href={track.track_href} target="_blank">
                {track.track_href}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default DisplayTracks;

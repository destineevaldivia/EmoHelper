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

  //return an array of 2 tracks
  const filterTrackByValence = (audioFeatures, valenceScore) => {
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
    return closestTracks;
  };
  return (
    <>
      <div>here</div>
    </>
  );
};
export default DisplayTracks;

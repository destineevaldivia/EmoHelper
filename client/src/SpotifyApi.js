import axios from "axios";

/** Place all spotify api related logic here **/

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get("access_token");
  const refreshToken = urlParams.get("refresh_token");

  console.log("querystr", queryString);
  console.log("urlparams", urlParams);
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);

  return accessToken;
};
export const accessToken = getAccessToken();

// Create axios custom global headers to keep HTTP requests DRY
// axios.defaults.baseURL = "https://api.spotify.com/v1";
// axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
// axios.defaults.headers["Content-Type"] = "application/json";

/*Get req to Spotify endpoint (Get User's Saved Tracks)
https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks */
export const getUsersSavedTracks = () => {
  // Generate a random offset between 0 and 500 so that I'm not always grabbing the first 50 from my saved music
  const randomOffset = Math.floor(Math.random() * 500);

  return axios.get("/me/tracks", {
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    params: {
      limit: 50,
      offset: randomOffset,
    },
  });
};

/*Get req to Spotify endpoint (Get Tracks' Audio Features)
https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features */

export const getTracksAudioFeatures = (savedTracks) => {
  // Extract the track IDs from the savedTracks state variable that was imported
  const trackIds = savedTracks.items.map((item) => item.track.id);
  // Create a string of track IDs to use in GET req to api /audio features
  const trackIdsString = trackIds.join(",");

  return axios
    .get(`/audio-features?ids=${trackIdsString}`, {
      baseURL: "https://api.spotify.com/v1",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const audioFeaturesData = response.data; // This is the audio features data
      return audioFeaturesData;
    })
    .catch((error) => {
      console.error("Error fetching audio features from spotifyApi:", error);
      throw error;
    });
};

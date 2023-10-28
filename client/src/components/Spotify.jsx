import axios from "axios";

//Placing all spotify related logic here
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

// Created axios custom global headers to keep HTTP requests DRY
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

//Get req to Spotify endpoint (Get Tracks' Audio Features)
//https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features

//export const getTracksAudioFeatures = () => axios.get("/audio-features");

/*Get req to Spotify endpoint (Get User's Saved Tracks)
https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks */
export const getUsersSavedTracks = () => {
  // Generate a random offset between 0 and 500 so that I'm not always grabbing the first 50 from my saved music
  const randomOffset = Math.floor(Math.random() * 500);

  return axios.get("/me/tracks", {
    params: {
      limit: 50,
      offset: randomOffset,
    },
  });
};

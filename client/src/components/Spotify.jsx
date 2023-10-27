//Placing all spotify related logic here
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get("access_token");
  const refreshToken = urlParams.get("refresh_token");

  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  console.log("querystr", queryString);
  console.log("urlparams", urlParams);

  return accessToken;
};
export const accessToken = getAccessToken();

//Created Axios request headers so we can keep HTTP requests neat
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

/*Get Tracks' Audio Features
https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
*/
export const getTracksAudioFeatures = () => axios.get("/audio-features");

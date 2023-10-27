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

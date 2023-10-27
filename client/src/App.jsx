import { useEffect } from "react";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
  }, []);

  return (
    <>
      <div>
        <h1>EmoHelper app coming soon</h1>
        <a className="App-link" href="http://localhost:8080/login">
          Login using Spotify
        </a>
      </div>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import {
  accessToken,
  getUsersSavedTracks,
  getTracksAudioFeatures,
} from "./SpotifyApi";

//imports the accessToken from Spotify.jsx
//uses token state to conditionally render login button
function App() {
  const [token, setToken] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    //imported getUsersSavedTracks fxn
    const fetchData = async () => {
      try {
        const { data } = await getUsersSavedTracks();
        setSavedTracks(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  console.log("savedTracks state successfully updated ", savedTracks);
  return (
    <>
      <div>
        <h1>EmoHelper app coming soon</h1>
        {!token ? (
          <a className="App-link" href="http://localhost:8080/login">
            <button>Log in using Spotify</button>
          </a>
        ) : (
          <h3>You are logged in!</h3>
        )}
      </div>
    </>
  );
}

export default App;

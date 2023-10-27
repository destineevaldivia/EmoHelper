import { useEffect, useState } from "react";
import { accessToken } from "./components/Spotify";

//imports the accessToken from Spotify.jsx
//uses token state to conditionally render login button
function App() {
  const [token, setToken] = useState(null);
  const [track, setTrack] = useState();

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

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

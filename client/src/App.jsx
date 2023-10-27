import { useEffect, useState } from "react";
import { accessToken } from "./components/Spotify";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <>
      <div>
        <h1>EmoHelper app coming soon</h1>
        {!token ? (
          <a className="App-link" href="http://localhost:8080/login">
            Login using Spotify
          </a>
        ) : (
          <h3>You are logged in!</h3>
        )}
      </div>
    </>
  );
}

export default App;

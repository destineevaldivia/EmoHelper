import { useEffect, useState } from "react";
import {
  accessToken,
  getUsersSavedTracks,
  getTracksAudioFeatures,
} from "./SpotifyApi";
import EmotionForm from "./components/EmotionForm";
import { ToastContainer } from "react-toastify";

//import the accessToken and utility functions from SpotifyApi.js file
//use token state to conditionally render login button
function App() {
  const [token, setToken] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getUsersSavedTracks();
        setSavedTracks(data);

        const audioFeaturesData = await getTracksAudioFeatures(data);
        setAudioFeatures(audioFeaturesData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  console.log("savedTracks state successfully updated ", savedTracks);
  console.log("audiofeatures state successfully updated ", audioFeatures);

  return (
    <>
      <div>
        <h1 className="App-title">EmoHelper app </h1>
        <p>emotion + music journaling </p>
        {!token ? (
          <a className="App-link" href="http://localhost:8080/login">
            <button>Log in using Spotify</button>
          </a>
        ) : (
          <div>
            <p>You are logged in!</p>
            <div className="emo-form-container">
              <EmotionForm
                audioFeatures={audioFeatures}
                savedTracks={savedTracks}
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

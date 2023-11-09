import { useEffect, useState } from "react";
//import the accessToken and utility functions from SpotifyApi.js file
import {
  accessToken,
  getUsersSavedTracks,
  getTracksAudioFeatures,
} from "./SpotifyApi";
import EmotionForm from "./components/EmotionForm";
import { ToastContainer } from "react-toastify";

function App() {
  // state variables
  const [token, setToken] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  // useEffect to set the token and fetch user data when the component mounts
  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        // Fetch user's saved tracks
        const { data } = await getUsersSavedTracks();
        setSavedTracks(data);

        // Fetch audio features of the saved tracks
        const audioFeaturesData = await getTracksAudioFeatures(data);
        setAudioFeatures(audioFeaturesData);
      } catch (error) {
        console.error("Error fetching at app.jsx:", error);
      }
    };
    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs only once, on mount
  console.log("savedTracks state successfully updated ", savedTracks);
  console.log("audiofeatures state successfully updated ", audioFeatures);

  return (
    <>
      <div>
        <h1 className="App-title">EmoHelper </h1>
        <h4> *~*~* validation journal *~*~* </h4>
        {/* Conditionally render login button and emotion form component*/}
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
      {/* Toast notifications container */}
      <ToastContainer />
    </>
  );
}

export default App;

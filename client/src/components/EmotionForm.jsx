import { useState } from "react";
import axios from "axios";
import DisplayTracks from "./DisplayTracks";
import Decision from "./Decision";
import EmoEntry from "./EmoEntry";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* functional component will: facilitate the selection of emotions, tracks, and decisions,
communicate with the server to fetch valence score,
create entries in database. */

const EmotionForm = ({ audioFeatures, savedTracks }) => {
  const emotions = [
    "desperation",
    "grief",
    "remorse",
    "sadness",
    "pessimism",
    "loneliness",
    "disappointment",
    "frustration",
    "gloominess",
    "nervousness",
    "anger",
    "boredom",
    "stress",
    "confusion",
    "peacefulness",
    "happiness",
    "bliss",
    "excitement",
    "enthusiasm",
    "ecstasy",
  ];
  //initialize state to manage user selection and formData
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [valenceScore, setValenceScore] = useState("");
  const [decision, setDecision] = useState("");
  const [formData, setFormData] = useState({
    selected_track: "",
    user_emotion: "",
    decision: "",
  });

  const handleEmotionChange = (event) => {
    //update selectedEmotion state, triggered by onChange event in emotion form
    setSelectedEmotion(event.target.value);
    //update formData state of user_emotion
    setFormData({
      ...formData,
      user_emotion: event.target.value,
    });

    //Make a GET req to express.js server to fetch valence score based on selected emotion
    axios
      .get("/getValence", {
        baseURL: "http://localhost:8080",
        params: { emotion: event.target.value }, //include selected emotion in the query
      })
      .then((response) => {
        const valence = response.data; //store the response.data in a const, valence score
        setValenceScore(valence); //update valenceScore state with setter function
      })
      .catch((error) => {
        console.log("Error getting valence:", error);
      });
  };

  //Function to update the formData state with the user's choice of track
  const updateSelectedTrack = (chosenTrack) => {
    setFormData({
      ...formData,
      selected_track: chosenTrack,
    });
  };
  //Function to update the formData state with the user's decision as a string to either 'let it' go or 'embrace it'
  const handleDecision = (newDecision) => {
    setDecision(newDecision);
    setFormData({
      ...formData,
      decision: newDecision,
    });
  };

  //Invoked when user submits the form
  //send POST req to server with formData
  const handleSubmitForm = (event) => {
    event.preventDefault();
    axios
      .post("/postEntry", formData, {
        baseURL: "http://localhost:8080",
      })
      .then((response) => {
        console.log("Emo entry created successfully");
        //imported success messaging with toast
        toast.success("Your Emo entry was created successfully!", {
          position: "top-center",
          autoClose: 3000, // Close the toast after 3 seconds
        });
      })
      .catch((error) => {
        console.error("Error creating Emo entry:", error);
      });
  };

  return (
    <div>
      <h3>Which of these emotions do you want to focus on?</h3>
      <form className="radio-container">
        {emotions.map((emotion) => (
          <div key={emotion}>
            <label className="radio-label">
              <input
                type="radio"
                className="emo-radio"
                value={emotion}
                checked={selectedEmotion === emotion}
                onChange={handleEmotionChange}
              />
              {emotion}
            </label>
          </div>
        ))}
      </form>
      {selectedEmotion ? (
        <div>
          <div className="track-form-container">
            <DisplayTracks
              selectedEmotion={selectedEmotion}
              valenceScore={valenceScore}
              audioFeatures={audioFeatures}
              savedTracks={savedTracks}
              updateSelectedTrack={updateSelectedTrack}
            />
          </div>
        </div>
      ) : null}
      {formData.selected_track ? (
        <div>
          <Decision handleDecision={handleDecision} />
        </div>
      ) : null}
      {decision ? (
        <div>
          <EmoEntry formData={formData} />
          <button type="submit" onClick={handleSubmitForm}>
            Create Emo entry
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default EmotionForm;

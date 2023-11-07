import { useState } from "react";
import axios from "axios";
import DisplayTracks from "./DisplayTracks";
import Decision from "./Decision";
import EmoEntry from "./EmoEntry";

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

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [valenceScore, setValenceScore] = useState("");
  const [decision, setDecision] = useState("");
  const [formData, setFormData] = useState({
    selected_track: "",
    user_emotion: "",
    decision: "",
  });

  const handleEmotionChange = (event) => {
    //update selectedEmotion state, triggered by onChange event in form
    setSelectedEmotion(event.target.value);
    setFormData({
      ...formData,
      user_emotion: event.target.value,
    });

    //Make a GET req to express.js server to get the valence score
    axios
      .get("/getValence", {
        baseURL: "http://localhost:8080",
        params: { emotion: event.target.value }, //include selected emotion in the query
      })
      .then((response) => {
        const valence = response.data; //store the response.data in a const, valence score
        setValenceScore(valence); //update valenceScore state
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

  const handleSubmitForm = (event) => {
    event.preventDefault();
    // console.log("Selected Emotion:", selectedEmotion);
  };
  console.log(valenceScore);

  return (
    <div>
      <h3>Which of these emotions do you want to focus on?</h3>
      <form>
        {emotions.map((emotion) => (
          <div key={emotion}>
            <label>
              <input
                type="radio"
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
          <button type="submit" onSubmit={handleSubmitForm}>
            Create Emo entry
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default EmotionForm;

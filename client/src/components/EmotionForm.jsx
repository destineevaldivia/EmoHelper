import { useState } from "react";
import axios from "axios";
import DisplayTracks from "./DisplayTracks";
import Decision from "./Decision";
import EmoEntry from "./EmoEntry";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// accept Spotify API JSON data as a prop
const EmotionForm = ({ audioFeatures, savedTracks }) => {
  // declare array of emotions
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
  //initialize states to manage user selection and formData
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [valenceScore, setValenceScore] = useState("");
  const [decision, setDecision] = useState("");
  const [formData, setFormData] = useState({
    selected_track: "",
    user_emotion: "",
    decision: "",
  });

  // Function to handle the change in selected emotion
  const handleEmotionChange = (event) => {
    //update selectedEmotion state, triggered by onChange event in emotion form
    setSelectedEmotion(event.target.value);
    //update formData state for user_emotion
    setFormData({
      ...formData,
      user_emotion: event.target.value,
    });

    // make a GET req to server to fetch valence score based on selected emotion
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

  // Function to update the formData state with the user's choice of track
  const updateSelectedTrack = (chosenTrack) => {
    setFormData({
      ...formData,
      selected_track: chosenTrack,
    });
  };
  // Function to update the formData state with the user's decision as a string to either 'let it' go or 'embrace it'
  const handleDecision = (newDecision) => {
    setDecision(newDecision);
    setFormData({
      ...formData,
      decision: newDecision,
    });
  };

  // Function to handle form submission, invoked when user submits the form
  const handleSubmitForm = (event) => {
    event.preventDefault();
    // send POST req to server with formData
    axios
      .post("/postEntry", formData, {
        baseURL: "http://localhost:8080",
      })
      .then((response) => {
        console.log("Emo entry created successfully");
        //use toast to display success messaging
        toast.success("Your Emo entry was saved successfully!", {
          position: "top-center",
          autoClose: 4000, // close the toast after 4 seconds
        });
      })
      .catch((error) => {
        console.error("Error creating Emo entry:", error);
      });
  };

  return (
    <section>
      {/* render emotion selection form */}
      <h3>Which of these emotions do you want to focus on?</h3>
      {/* see accessibility aria attribute for screen readers to anounce updates */}
      <form className="radio-container" aria-live="polite">
        {emotions.map((emotion) => (
          <label key={emotion} className="radio-label" htmlFor={emotion}>
            <input
              type="radio"
              className="emo-radio"
              value={emotion}
              checked={selectedEmotion === emotion}
              onChange={handleEmotionChange}
            />
            {emotion}
          </label>
        ))}
      </form>
      {/* conditionally display tracks based on selected emotion */}
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
      {/* conditionally render decision component */}
      {formData.selected_track ? (
        <div>
          <Decision handleDecision={handleDecision} />
        </div>
      ) : null}
      {/* conditionally render EmoEntry component and submit button */}
      {decision ? (
        <div>
          <EmoEntry formData={formData} />
          <button
            className="submit-btn"
            type="submit"
            onClick={handleSubmitForm}
          >
            Save
          </button>
        </div>
      ) : null}
    </section>
  );
};
export default EmotionForm;

import { useState } from "react";

const EmotionForm = () => {
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

  const handleEmotionChange = (event) => {
    //update selectedEmotion state, triggered by onChange event in form
    setSelectedEmotion(event.target.value);

    //Make a GET req to express.js server to get the valence score
    axios
      .get("/getValence", {
        params: { emotion: event.target.value }, //include selected emotion in the query
      })
      .then((response) => {
        const valence = response.data; //store the response, valence score, from the server
        //*** wip- use valence to filter through the spotify features api
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Emotion:", selectedEmotion);
  };

  return (
    <div>
      <h3>Which of these emotions do you want to focus on?</h3>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default EmotionForm;

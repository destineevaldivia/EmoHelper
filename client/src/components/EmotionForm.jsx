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
    setSelectedEmotion(event.target.value);
  };

  //I will want to get the valence score of this emotion by querying the db
  const handleSubmit = (event) => {
    event.preventDefault();
    //...work in progress
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

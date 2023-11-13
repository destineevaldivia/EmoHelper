// receives formData as a prop
const EmoEntry = ({ formData }) => {
  //create date function
  console.log("formData accessed:", formData);
  const getCurrentDate = () => {
    return new Date().toLocaleDateString();
  };
  const currentDate = getCurrentDate();

  // use formData to create an interpolated statement for the emoEntry
  return (
    <section>
      <h3>Here is your Emo Entry:</h3>

      <div className="emo-entry">
        <h2>
          On {currentDate} you were experiencing {formData.user_emotion} and it
          was giving, '{formData.selected_track}' vibes. You decided to{" "}
          {formData.decision}.
        </h2>
      </div>
    </section>
  );
};

export default EmoEntry;

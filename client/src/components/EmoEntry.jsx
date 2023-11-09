const EmoEntry = ({ formData }) => {
  //create date function
  console.log("formData accessed:", formData);
  const getCurrentDate = () => {
    return new Date().toLocaleDateString();
  };
  const currentDate = getCurrentDate();
  return (
    <div>
      <h2>
        On {currentDate} you were experiencing {formData.user_emotion} and it
        was giving, '{formData.selected_track}' vibes. You decided to{" "}
        {formData.decision}.
      </h2>
    </div>
  );
};

export default EmoEntry;

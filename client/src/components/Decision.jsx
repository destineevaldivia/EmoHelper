// receives handleDecision function as a prop, triggered by onClick fxn
const Decision = ({ handleDecision }) => {
  // Function to handle the user's decision
  const makeDecision = (decision) => {
    handleDecision(decision);
    console.log("decision:", decision);
  };
  return (
    <div>
      <h3>
        Now it's time to make a decision about what to do with this emotion. Do
        you want to:{" "}
      </h3>
      <button className="let-go-btn" onClick={() => makeDecision("Let it go")}>
        Let it go
      </button>{" "}
      or{" "}
      <button
        className="embrace-btn"
        onClick={() => makeDecision("Embrace it")}
      >
        Embrace it
      </button>
    </div>
  );
};

export default Decision;

const Decision = ({ handleDecision }) => {
  const makeDecision = (decision) => {
    handleDecision(decision);
    console.log("decision:", decision);
  };
  return (
    <div>
      <h2>
        Now it's time to make a decision about what to do with this emotion. Do
        you want to:{" "}
      </h2>
      <button className="letgo-btn" onClick={() => makeDecision("Let it go")}>
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

const Decision = ({ handleDecision }) => {
  const makeDecision = (decision) => {
    handleDecision(decision);
    console.log("decision:", decision);
  };
  return (
    <div>
      <h3>Now it's time to make a decision. Do you want to: </h3>
      <button onClick={() => makeDecision("Let it go")}>
        Let it go
      </button> or{" "}
      <button onClick={() => makeDecision("Embrace it")}>Embrace it</button>
    </div>
  );
};

export default Decision;

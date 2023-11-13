import React from "react";
import { render, screen } from "@testing-library/react";
import EmotionForm from "./EmotionForm";

test("renders emotion selection form", () => {
  render(<EmotionForm audioFeatures={{}} savedTracks={{}} />);

  // Expect the heading to be present
  expect(
    screen.getByText(/Which of these emotions do you want to focus on?/)
  ).toBeInTheDocument();

  // Expect each emotion label to be present
  [
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
  ].forEach((emotion) => {
    expect(screen.getByText(emotion)).toBeInTheDocument();
  });

  // Expect the radio buttons to be present
  [
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
  ].forEach((emotion) => {
    expect(screen.getByRole("radio", { name: emotion })).toBeInTheDocument();
  });
});

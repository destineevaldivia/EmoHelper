import React from "react";
import { render } from "@testing-library/react";
import EmoEntry from "./EmoEntry";

// Mock the formData prop for testing
const mockFormData = {
  user_emotion: "Happy",
  selected_track: "Happy Song",
  decision: "Dance",
};

test("renders EmoEntry component with correct information", () => {
  // Render the component with the mockFormData
  const { getByText } = render(<EmoEntry formData={mockFormData} />);

  // Check if the component renders the correct information
  const emoEntryText = getByText(
    /On .* you were experiencing Happy and it was giving, 'Happy Song' vibes. You decided to Dance./i
  );
  expect(emoEntryText).toBeInTheDocument();
});

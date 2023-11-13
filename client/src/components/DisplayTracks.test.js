import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DisplayTracks from "./DisplayTracks";

describe("DisplayTracks Component", () => {
  // Mock props for testing
  const mockProps = {
    audioFeatures: {
      audio_features: [
        { id: "1", valence: 0.5 },
        { id: "2", valence: 0.7 },
      ],
    },
    selectedEmotion: "Happy",
    valenceScore: "0.6",
    savedTracks: {
      items: [
        {
          track: {
            id: "1",
            name: "Track 1",
            album: { images: [{ url: "image_url" }] },
            external_urls: { spotify: "spotify_url_1" },
          },
        },
        {
          track: {
            id: "2",
            name: "Track 2",
            album: { images: [{ url: "image_url" }] },
            external_urls: { spotify: "spotify_url_2" },
          },
        },
      ],
    },
    updateSelectedTrack: jest.fn(),
  };

  test("renders DisplayTracks component with matched tracks", () => {
    render(<DisplayTracks {...mockProps} />);

    // Check if the component renders the track information correctly
    const trackElements = screen.getAllByRole("listitem");
    expect(trackElements).toHaveLength(2); // display two closest tracks

    // Mock a user choosing a track
    fireEvent.click(screen.getByText("Choose this track"));

    // Check if the updateSelectedTrack function is called with the correct argument
    expect(mockProps.updateSelectedTrack).toHaveBeenCalledWith("Track 1");
  });
});

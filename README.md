# EmoHelper

Overview: EmoHelper is a unique guide to emotional awareness with the help of music. Leveraging the Spotify Web API, the app curates tracks from the user's personal Spotify library that align with their emotional state. I employed valence data, a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track and the user's emotional input to map the correlation.

The app offers a cathartic experience with validating ‘emo-entries’, personalized statements, that look like handwrritten notes to self, acknowledging their emotional state, song choice, and the decision to embrace or let go. The entry is then securely stored in a databse.

As a final touch, the user can listen to the selected tracks on their Spotify account by clicking on the album art. The journey through the app not only offers a cathartic experience but also provides a chance for users to actively practice their emotional processing skills.

![Alt text](emohelper-demo-screenshot.png)

# Techstack

- Languages: Javascript, HTML, CSS
- Frameworks: React.js, Express.js, Node.js, PostgreSQL
- Spotify Web API: https://developer.spotify.com/documentation/web-api

# User Flow and Component Tree

![Alt text](<userflow wireframe screenshot.png>)

# Future Features and Limitations

1. Implement a dashboard feature for users to revisit and reflect on their stored 'emo entries'.
2. Enable in-app music playback and empower users to craft 'emo_playlists' directly from their dashboard entries.
3. Integrate a language model or chat GPT, allowing users to search using any emotion beyond preset options.
4. Explore extending compatibility beyond Spotify, considering inclusion of multiple streaming services like Apple Music.
5. Elevate music curation by incorporating additional track attributes like "danceability," "energy," and "loudness."
6. Allow users to reshuffle suggested songs if they don't like the suggestions.
7. Explore solutions to improve accuracy in suggesting songs that truly resonate with the user's emotional state, recognizing the inherent challenge of emotions being entirely subjective

# Installation

1. The Spotify Web API requires authentication through OAuth, and users need to obtain their own access tokens. Users can authenticate using the Authorization Code Flow.
   https://developer.spotify.com/documentation/web-api/tutorials/getting-started
2. Clone the repo
3. See secret key example in .env-example
4. Run on your local server

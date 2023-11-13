# EmoHelper

App Overview: EmoHelper is a unique guide to emotional awareness with the help of music. Leveraging the Spotify Web API, the app curates tracks from the user's personal Spotify library that align with their emotional state. I employed valence data, a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track and the user's emotional input to map the correlation.

The app offers a cathartic experience with validating ‘emo-entries’, personalized statements, that look like handwrritten notes to self, acknowledging their emotional state, song choice, and the decision to embrace or let go. The entry is then securely stored in a databse.

As a final touch, the user can listen to the selected tracks on their Spotify account by clicking on the album art. The journey through the app not only offers a cathartic experience but also provides a chance for users to actively practice their emotional processing skills.

![Alt text](emohelper-demo-screenshot.png)

# Techstack

Languages: Javascript, HTML, CSS
Frameworks: React.js, Express.js, Node.js, PostgreSQL
API: Spotify Web API, multiple endpoints (see SpotifyApi.js)
https://developer.spotify.com/documentation/web-api

See db.sql file for database schema and tables

# User Flow and Component Tree

![Alt text](<userflow wireframe screenshot.png>)

# Future Features and Limitations

1. In the future, I'd like to not only save the emo entries in the db, but also create a dashboard where users can look back at all their previous entries.
2. Currently, the user can is redirected to their spotify account to listen to the song and I'd like to add a feature where they can listen within the app and create emo_playlists from their dashboard entries as well
3. Use a language model or chat GPT to allow users to search with any emotion rather than the hard coded mapped out emotion options.
4. Consider the limitation that only non-spotify account holder can use this app and consider explanding it to multiple streaming services like apple music, etc.
5. Enhance the music curation by considering additional music features such as the tracks "danceability", "energy" and "loudness".
6. Address another limitation: emotions are entirely subjective and the app might not suggest songs that accurately represent the emotion being felt. One small solution, which doesnt address the whole problem, is allowing a reshuffle of the song.

# installation

1. The Spotify Web API requires authentication through OAuth, and users need to obtain their own access tokens. Users can authenticate using the Authorization Code Flow.
   https://developer.spotify.com/documentation/web-api/tutorials/getting-started
2. clone the repo
3. see .env-example for secret key instructions
4. run on your local server

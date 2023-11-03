-- PostgreSQL database dump
CREATE DATABASE emohelper_db;

--  Create Tables
CREATE TABLE EmoMap (
  id SERIAL PRIMARY KEY,
  valence NUMERIC,
  emotion TEXT
);

INSERT INTO EmoMap (valence, emotion) 
VALUES 
(0.0, 'desperation'),
(0.05, 'grief'),
(0.10, 'remorse'),
(0.15, 'sadness'),
(0.20, 'pessimism'),
(0.25, 'loneliness'),
(0.30, 'disappointment'),
(0.35, 'frustration'),
(0.40, 'gloominess');
(0.45, 'nervousness'),
(0.50, 'anger'),
(0.55, 'boredom'),
(0.60, 'stress'),
(0.65, 'confusion'),
(0.70, 'peacefulness'),
(0.75, 'happiness'),
(0.80, 'bliss'),
(0.85, 'excitement'),
(0.90, 'enthusiasm'),
(1.0, 'ecstacy');



CREATE TABLE EmoEntries (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  selected_track TEXT NOT NULL,
  user_emotion TEXT NOT NULL,
  decision VARCHAR (25) NOT NULL
);

INSERT INTO EmoEntries (id, created_at, selected_track, user_emotion, decision ) {
...
}

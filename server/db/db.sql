-- PostgreSQL database dump
CREATE DATABASE emohelper_db;

--  Create Tables
CREATE TABLE EmoMap (
  id SERIAL PRIMARY KEY,
  valence NUMERIC,
  emotion TEXT
);

INSERT INTO EmoMap (id, valence, emotion) {
...
}

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

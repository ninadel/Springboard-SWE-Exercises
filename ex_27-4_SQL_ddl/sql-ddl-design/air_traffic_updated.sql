-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE airlines
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE cities
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT REFERENCES countries

);

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline REFERENCES airlines
  route REFERENCES routes
);

CREATE TABLE routes
(
  id SERIAL PRIMARY KEY,
  from_city INT REFERENCES cities,
  to_city INT REFERENCES cities
);


CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  seat TEXT NOT NULL,
  flight INTEGER REFERENCES flights,
  passenger INTEGER REFERENCES passengers
);
-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbit_center INTEGER REFERENCES orbit_centers,
  galaxy INTEGER REFERENCES galaxies
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet INTEGER REFERENCES planets
);

CREATE TABLE orbit_centers
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
);

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
);
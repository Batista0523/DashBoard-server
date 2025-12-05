\c batistack_dev

DROP TABLE IF EXISTS user_settings;
DROP TABLE IF EXISTS saved_sports_teams;
DROP TABLE IF EXISTS saved_movies;
DROP TABLE IF EXISTS saved_cryptos;
DROP TABLE IF EXISTS saved_cities;
DROP TABLE IF EXISTS dashboards_users;

CREATE TABLE IF NOT EXISTS dashboards_users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_cities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES dashboards_users(id) ON DELETE CASCADE,
  city_name TEXT NOT NULL,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_cryptos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES dashboards_users(id) ON DELETE CASCADE,
  coin_id TEXT NOT NULL,
  coin_symbol TEXT,
  coin_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_movies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES dashboards_users(id) ON DELETE CASCADE,
  movie_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  poster_path TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_sports_teams (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES dashboards_users(id) ON DELETE CASCADE,
  team_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  league TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES dashboards_users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'light',
  language TEXT DEFAULT 'en',
  default_dashboard TEXT DEFAULT 'crypto',
  created_at TIMESTAMP DEFAULT NOW()
);

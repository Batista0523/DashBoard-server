\c batistack_dev
-- Clean tables
TRUNCATE TABLE user_settings RESTART IDENTITY CASCADE;
TRUNCATE TABLE saved_sports_teams RESTART IDENTITY CASCADE;
TRUNCATE TABLE saved_movies RESTART IDENTITY CASCADE;
TRUNCATE TABLE saved_cryptos RESTART IDENTITY CASCADE;
TRUNCATE TABLE saved_cities RESTART IDENTITY CASCADE;
TRUNCATE TABLE dashboards_users RESTART IDENTITY CASCADE;

-- Users
INSERT INTO dashboards_users (full_name, email, password, role)
VALUES
('John Doe', 'john@example.com', 'password123', 'user'),
('Maria Rivera', 'maria@example.com', 'password123', 'user'),
('Admin User', 'admin@example.com', 'password123', 'admin');

-- Saved cities
INSERT INTO saved_cities (user_id, city_name, country)
VALUES
(1, 'New York', 'USA'),
(1, 'Santiago', 'Dominican Republic'),
(2, 'Los Angeles', 'USA');

-- Saved cryptos
INSERT INTO saved_cryptos (user_id, coin_id, coin_symbol, coin_name)
VALUES
(1, 'bitcoin', 'BTC', 'Bitcoin'),
(1, 'ethereum', 'ETH', 'Ethereum'),
(2, 'solana', 'SOL', 'Solana');

-- Saved movies
INSERT INTO saved_movies (user_id, movie_id, title, poster_path)
VALUES
(1, 550, 'Fight Club', '/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg'),
(2, 299534, 'Avengers: Endgame', '/or06FN3Dka5tukK1e9sl16pB3iy.jpg');

-- Saved sports teams
INSERT INTO saved_sports_teams (user_id, team_id, team_name, league)
VALUES
(1, '1610612738', 'Boston Celtics', 'NBA'),
(2, '1610612747', 'Los Angeles Lakers', 'NBA');

-- User settings
INSERT INTO user_settings (user_id, theme, language, default_dashboard)
VALUES
(1, 'dark', 'en', 'crypto'),
(2, 'light', 'es', 'weather'),
(3, 'dark', 'en', 'movies');

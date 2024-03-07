-- Auth
CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE IF NOT EXISTS auth.users (
  id SERIAL PRIMARY KEY UNIQUE,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

INSERT INTO auth.users (email, "password", created_at, last_login)
VALUES ('admin@admin.com', '$2b$10$k7N.nlW4IcfXJzvJMXSqTexhQAG9VGCaWnOnjQa/OBIg4960cth9W', '2024-01-01 00:00:00.000', '2024-01-01 00:00:00.000');


CREATE TABLE IF NOT EXISTS auth.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Trade
CREATE SCHEMA IF NOT EXISTS trade;

CREATE TABLE IF NOT EXISTS trade.deposits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  amount numeric(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE trade.loans (
  id serial4 NOT NULL,
  user_id int4 NOT NULL,
  lent_amount_wint numeric(12,2) NOT NULL,
  current_amount_wint numeric(12,2) NOT NULL,
  lent_duration_month int not null,
  collateral VARCHAR NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT loans_pkey PRIMARY KEY (id),
  CONSTRAINT loans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
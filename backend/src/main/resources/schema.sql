CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,      -- BCrypt hash
  display_name VARCHAR(150) NOT NULL,
  roles VARCHAR(200) NOT NULL          -- e.g., "ROLE_USER"
);

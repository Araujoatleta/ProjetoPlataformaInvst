-- Users table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    avatar_url NVARCHAR(255),
    is_admin BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Courses table
CREATE TABLE Courses (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    video_url NVARCHAR(255) NOT NULL,
    thumbnail_url NVARCHAR(255),
    created_by INT REFERENCES Users(id),
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Posts table
CREATE TABLE Posts (
    id INT IDENTITY(1,1) PRIMARY KEY,
    content NVARCHAR(MAX) NOT NULL,
    author_id INT REFERENCES Users(id),
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Likes table
CREATE TABLE Likes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    post_id INT REFERENCES Posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(id),
    created_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT UC_PostUser UNIQUE (post_id, user_id)
);

-- Messages table
CREATE TABLE Messages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    sender_id INT REFERENCES Users(id),
    receiver_id INT REFERENCES Users(id),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    read BIT DEFAULT 0
);
CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY(1,1),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Stocks (
  symbol VARCHAR(10) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  current_price DECIMAL(10,2),
  dividend_yield DECIMAL(10,4),
  earnings DECIMAL(10,2),
  eps DECIMAL(10,2),
  book_value DECIMAL(10,2),
  ebit DECIMAL(10,2),
  enterprise_value DECIMAL(10,2),
  roic DECIMAL(10,4),
  pe_ratio DECIMAL(10,2),
  growth_rate DECIMAL(10,4),
  updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE REITs (
  symbol VARCHAR(10) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  current_price DECIMAL(10,2),
  dividend_yield DECIMAL(10,4),
  price_to_book_ratio DECIMAL(10,2),
  updated_at DATETIME DEFAULT GETDATE()
);

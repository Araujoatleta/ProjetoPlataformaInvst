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
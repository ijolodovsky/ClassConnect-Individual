CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

INSERT INTO courses (title, description) VALUES
('Introduction to Programming', 'Basic course on programming fundamentals'),
('Advanced Databases', 'Course on database design and optimization'),
('Web Development with Node.js', 'Learn how to build web applications using Node.js and Express'),
('Artificial Intelligence', 'Introductory course on AI algorithms and machine learning'),
('Cybersecurity', 'Key concepts of computer security and data protection')
ON CONFLICT (id) DO NOTHING;

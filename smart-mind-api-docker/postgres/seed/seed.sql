BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined, age) VALUES ('test','test@gmail.com', 5, '2020-01-01', 25);

INSERT INTO login (hash, email) VALUES ('$2a$10$ZqTESkaySMzkSMeK03WMueNxdtclmGjMR6lWm2WXXqgpU8nczjUEC','test@gmail.com');

COMMIT;
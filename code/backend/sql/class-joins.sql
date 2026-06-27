-- CREATE TABLE students_join(
--     student_id SERIAL PRIMARY KEY,
--     name VARCHAR(50),
--     email VARCHAR(100),
--     brach VARCHAR(50)
-- );
CREATE TABLE amount(
    name VARCHAR(20),
    amount INT
);
INSERT INTO amount(name,amount)
VALUES
('hitesh',5000),
('ganesh',5000);
-- CREATE TABLE intership(
--     internship_id SERIAL PRIMARY KEY,
--     company_name VARCHAR(50),
-- --     role VARCHAR(50),
-- --     stipend INT CHECK(stipend >1000),
-- --     status VARCHAR(20),
-- --     student_id INT REFERENCES students_join(student_id)  ON DELETE CASCADE
-- -- );


INSERT INTO students_join(name,email,brach)
VALUES
('Rahul','rahul@gmail.com','Computer Science'),
('Senhea','sneha@yaho.com','Inforamtion tech'),
('Amith','amith@gamil.come','Electronics'),
('Priya','priya@gmail.com','Mechnical'),
('Rohan','rohan@gmail.com','Civil');

INSERT INTO intership(student_id,company_name,role,stipend)
VALUES
(1,'Google','Software Enginners Intern',100000),
(1,'Microsoft','SDE Intern',85000),
(2,'Amazone','Data Ananlaysis Intern',60000),
(3,'TCS','Systema Engineer Intern',23000),
(5,'openAI','AI Resercher',1500);

-- SELECT * FROM intership;
-- SELECT*FROM students_join;


SELECT 
    s.name,
    s.brach,         -- (Note: Aapke table me branch ki spelling 'brach' hai)
    i.company_name,
    i.role,
    i.stipend
FROM students_join AS s
FULL OUTER JOIN intership AS i ON s.student_id = i.student_id; -- Sahi galti yahan thi
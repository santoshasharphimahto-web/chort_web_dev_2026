-- CREATE TABLE students(
--     student_id SERIAL PRIMARY KEY, --SERIAL AUTO INCREAMENT ,PK-NOT NULL,UNIQUE
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50),
--     email VARCHAR(100) NOT NULL UNIQUE,
--     phone_number char(10) NOT NULL UNIQUE,
--     country_code VARCHAR(4),
--     age INT CHECK(age>12),
--     current_status VARCHAR(30) DEFAULT 'active' CHECK(current_status IN('active','pendeing','graduated')),
--     masterji_handle VARCHAR(50), --URENAME
--     mastrji_joined BOOLEAN DEFAULT 'FALSE',
--     current_score INT DEFAULT 0 CHECK(current_score >= 0 AND current_score <= 100),
--     enrollment_date DATE DEFAULT CURRENT_DATE
-- )

-- -- for updating a table

ALTER TABLE students 
ADD COLUMN batch VARCHAR(20) DEFAULT 'WEB-DEV-26'


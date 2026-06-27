-- CREATE TABLE canteen_manue(
--     iteam_id SERIAL PRIMARY KEY,
--     iteam_name VARCHAR(50) NOT NULL,
--     category VARCHAR(40) NOT NULL,
--     price INT NOT NULL,
--     is_availabile BOOLEAN DEFAULT TRUE
-- );

INSERT INTO canteen_manue (iteam_name,category,price)
VALUES
('Masal Chai','Beverages',10),
('vada Paw','Snacks',15),
('Samosa','Snacks',12),
('Rajma Chawal','meals',60),
('Maggi','Snacks',25),
('Ice Tea','Beverasges',40),
('Ideali','Sancke',50);

-- SELECT * FROM canteen_manue;

-- updating the colum value of the  table
UPDATE canteen_manue
SET price=20
WHERE iteam_name='vada Paw';

UPDATE canteen_manue
SET price=price - 5
WHERE category='Sancke';

UPDATE canteen_manue
SET is_availabile=false,price=10
WHERE iteam_name='Samosa';
-- SELECT * FROM canteen_manue;

-- deleting the raw on the comulm value 
-- dry run alwayes prefore before delete 


DELETE  FROM canteen_manue
WHERE iteam_name ='Rajma';
SELECT * FROM canteen_manue;





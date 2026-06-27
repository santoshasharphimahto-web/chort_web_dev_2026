-- CREATE TABLE smart_watch_sales(
--     sale_id SERIAL PRIMARY KEY,
--     brand VARCHAR(40),
--     model VARCHAR(80),
--     city VARCHAR(50),
--     units_sold INT,
--     price_per_unit DECIMAL(10,2),
--     sale_date DATE

-- );

-- INSERT INTO smart_watch_sales
-- (brand,model,city,units_sold,price_per_unit,sale_date)
-- VALUES
-- ('Boat','strome call','Mumbai',10,1500.00,'2023-10-01'),
-- ('Boat','strome call','Delhi',15,1500.00,'2023-10-02'),
-- ('Noise','ColorFit','Bangalore',20,2000.00,'2023-10-01'),
-- ('Noise','ColorFit','Mumbai',5,2000.00,'2023-10-01'),
-- ('Apple','Watch Series 9','Mumbai',2,4500.00,'2023-10-01'),
-- ('Apple','Watch Series 9','Delihi',2,3500.00,'2023-10-01'),
-- ('Samsung','Glaxy Watch','Delhi',3,3500.00,'2023-10-01'),
-- ('Apple','Watch Series 9','Mumbai',2,4500.00,'2023-10-01');

-- count(*) Aggrigate function 
SELECT COUNT(*) AS row_count FROM smart_watch_sales;

-- sum aggriagat fn 
SELECT SUM(price_per_unit*units_sold) AS total_revene_comapny
FROM smart_watch_sales;

-- AVG() agrrigate function
SELECT  AVG(price_per_unit) as average FROM smart_watch_sales;

--min( agrigate function)

SELECT MIN(price_per_unit)  AS chipest FROM smart_watch_sales;
SELECT Max(price_per_unit)  AS Mangha FROM smart_watch_sales;

-- Grouping 

SELECT brand,SUM(units_sold) AS total_brand_sell
FROM smart_watch_sales
GROUP BY brand
ORDER BY total_brand_sell DESC ;



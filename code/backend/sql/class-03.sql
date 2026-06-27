-- CREATE TABLE ipl_player(
--     player_id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     team VARCHAR(50),
--     roll VARCHAR(50) NOT NULL,
--     run_scored INT CHECK(run_scored>=0),
--     wicket_taken INT CHECK(wicket_taken>=0),
--     auction_price_in_croes INT
-- )

-- -- inserting data into a ipl_plyaer data 

INSERT INTO ipl_player(name,team,roll,run_scored,wicket_taken,auction_price_in_croes)
VALUES
('virate kholi','RCB','bastman',973,0,15.00),
('ms dhoni','csk','bastman',450,0,12.00),
('jasprith bumrha','mumbai','bowler',15,27,12.00),
('Hardik pandaye','mumbai','all-rounder',400,15,11.00),
('Sunial Narayan','KKR','all-rounder',350,20,8.00),
('Rohit Sharma','mumbai','bastmen',560,0,16.00),
('Rashid kahn','gujrarth Titain','bowler',50,18,15.00),
('rinku Sing','KKR','bastman',600,0,8.00);

SELECT * FROM  ipl_player;
SELECT name,team,roll FROM ipl_player;

--filterning
SELECT * FROM ipl_player WHERE team='mumbai';
SELECT name,auction_price_in_croes,team FROM ipl_player WHERE auction_price_in_croes>10;
--logiacal and or operator

SELECT * FROM ipl_player WHERE auction_price_in_croes>10 AND ROLL='all-rounder';
SELECT* FROM ipl_player WHERE team='RCB' OR team='csk';

--patter matching like a regex 
SELECT * FROM ipl_player WHERE name LIKE '_a%';
 
--select a data fro the array condition 
SELECT * FROM ipl_player WHERE team IN('mumbai','RCB','KKR','csk');

--range slection 
SELECT * FROM ipl_player WHERE auction_price_in_croes BETWEEN 10 AND 15;

--  sorting by oder
SELECT name ,auction_price_in_croes,team FROM ipl_player
ORDER BY auction_price_in_croes DESC;

SELECT name ,auction_price_in_croes,team FROM ipl_player
ORDER BY team ASC, auction_price_in_croes DESC;

--pagenation concepts 
SELECT * FROM ipl_player WHERE team='mumbai'
ORDER BY auction_price_in_croes DESC
LIMIT 10 OFFSET 1;

-- OFSET(PAGE-1)*LIMIT

-- modifing data on the runtime ;

SELECT name,team,auction_price_in_croes,
(auction_price_in_croes*100)AS price_in_lakhs
FROM ipl_player;

-- how we can get a distict value 

SELECT distinct roll FROM ipl_player

-- updatating the cloum value 






CREATE TABLE iplPlayer1(
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    team VARCHAR(50),
    roll VARCHAR(50) NOT NULL,
    run_scored INT CHECK(run_scored>=0),
    wicket_taken INT CHECK(wicket_taken>=0),
    auction_price_in_croes INT
)




